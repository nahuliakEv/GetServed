'use strict';
var express = require('express');
var router = express.Router();
var User = require('../shemas/user');
var Restaurants = require('../shemas/restaurant');
var countries = require ('countries-cities').getCountries();
var cities = require('countries-cities');
var Booking = require('../shemas/booking');
var Menu = require('../shemas/menu');
var settings = require('../modules/settings');
var Order = require('../shemas/order');
var Photo = require('../shemas/photo');
var DocumentRest = require('../shemas/document');
var multer  = require('multer');
var path = require('path');

module.exports = (passport) => {
    router.get('/', (request, response) => {
        response.render('index', { title: 'Express' });
    });

    var uploadDocuments = multer({storage: storageDocuments});    
    router.post('/uploaddocuments', uploadDocuments.array('document', 5), function(request, response, next) {
        var documents = [];
        request.files.forEach(file => {
            let document = new DocumentRest();

            document.path = file.path;
            document.filename = file.filename;
            document.link = settings.serverUrl + file.path.split('public')[1];
            document.restaurantId = request.body.restaurantId;

            documents.push(document);
        });

        DocumentRest.create(documents, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                response.send({status: "OK", documents: result})
            }
        })
    });

    var uploadPhoto = multer({storage: storagePhoto});
    router.post('/uploadphoto', uploadPhoto.single('photo'), function(request, response, next) {
        let photo = new Photo();

        photo.path = request.file.path;
        photo.filename = request.file.filename;
        photo.link = settings.serverUrl + request.file.path.split('public')[1];

        Photo.create(photo, (err, result) => {
            if (err) {
                response.send({ status: "ERROR" })
            } else {
                response.send({status: "OK", image: result.link})
            }
        })
    });

    router.post('/booking/order', (request, response) => {
        var order = new Order();
        order.bookingId = request.body.bookingId;
        order.dishes = request.body.dishes;
        order.fullPrice = request.body.fullPrice;
        Order.create(order, (err, result) => {
            if (err) {
                response.send({ status: "ERROR" })
            } else {
                response.send({status: "OK", message: "Order saved", result: result})
            }
        })
    }),

    router.get('/menu/:idRestaurant', (request, response) => {
        Menu.findOne({restaurantId: request.params["idRestaurant"]}, (err, res) => {
            if (err) response.send({ status: "ERROR" });
            console.log(res);
            if (res == null) {
                response.send({ status: "ERROR", message: "Menu or restaurant not found" })
            } else {
                response.send({status: "OK", result: res})
            }
            
        });
    });

    router.post('/booking', (request, response) => {
        try {
            var booking = new Booking();
            booking.date = request.body.date;
            booking.numPeople = request.body.numPeople;
            booking.userId = request.body.userId;
            booking.restaurantId = request.body.restaurantId;
            Booking.create(booking, (err, result) => {
                if (err) response.send({ status: "ERROR" });
                response.send({status: 'OK', message: "Booking saved", bookingId: result._id})
            })
        } catch (error) {
            response.send({status: "ERROR", message: "Invalid date type"})
        }
    })

    router.get('/getCountries', (request, response) => {
        response.send(countries);
    });

    router.get('/getCountries/:country', (request, response) => {
        response.send(cities.getCities(request.params["country"]));
    });

    router.get('/restaurants', (request, response) => {
        Restaurants.find({}, (err, result) => {
            if(err) return console.log(err);
            response.send(result);
        });
    })

    router.get('/users', (request, response, ) => {
       User.find({}, (err, users) => {
            response.send(users);
        })
    })

    router.get("/login", (request, response) => {
        response.send({status: 'ERROR', message: 'Login or password is incorrect.'})
    })

    router.post("/login", passport.authenticate('login', {
        failureRedirect: '/login',
        failureFlash: true
    }), (request, response) => {
        if (!request.body) return response.sendStatus(400);
        response.json(200, {status: 'OK', message: 'Login is successful', 
        userId: request.user._id, name: request.user.local.fullName, email: request.user.local.email})
    });

    router.get('/registration', (req, res) => {
        res.send({status: 'ERROR', message: 'User already exists with this email.'});
    })

    router.post('/registration', passport.authenticate('registration', {
        failureRedirect: '/registration',
        failureFlash: true
    }), (request, response) => {
        console.log(request);
        if (!request.body) return response.sendStatus(400);
        response.json(200, {status: 'OK', message: 'Registration is successful'})
    });

    router.get('/home', isAuthenticated, (request, response) => {
        response.send('home page');
    });
    
    router.get('/signout', (request, response) => {
        request.logout();
        response.redirect('/');
    });
    
    router.get('/login/facebook', passport.authenticate('facebook', { scope : 'email' }
	));

	// handle the callback after facebook has authenticated the user
	router.get('/login/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/home',
			failureRedirect : '/'
		})
	);

    router.get('/login/twitter', passport.authenticate('twitter'));

    router.get('/login/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/home',
            failureRedirect: '/'
        })
    );

    router.get('/login/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    
    router.get('/login/google/callback',
        passport.authenticate('google', {
            //successRedirect: '/home',
            //failureRedirect: '/'
        }), (request, response) => {
            response.send("Success");
        }
    );

    return router;

}

var storageDocuments = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/documents/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

var storagePhoto = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

var isAuthenticated = function (request, response, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (request.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	response.send("User not authenticated");
}