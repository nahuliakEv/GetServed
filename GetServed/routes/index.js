'use strict';
var express = require('express');
var router = express.Router();
var User = require('../shemas/user');
var Restaurants = require('../shemas/restaurant');

var isAuthenticated = function (request, response, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (request.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	response.send("User not authenticated");
}

module.exports = (passport) => {
    router.get('/', (request, response) => {
        response.render('index', { title: 'Express' });
    });
    
    router.get('/restaurants', (request, response) => {
        Restaurants.find({}, (err, result) => {
            if(err) return console.log(err);
            response.send(result);
        });
        // for (let index = 1; index <= 10; index++) {
        //     Restaurants.create(
        //         {
        //             name: "Restaurant" + index,
        //             location: {
        //                 country: "USA",
        //                 street: "9189, janskerkhof",
        //                 city: "midden-drenthe",
        //                 state: "gelderland",
        //                 postcode: 65392
        //             },
        //             rating: 4.7,
        //             coordinates: {
        //                 lat: 15.557,
        //                 lng: 23.795
        //             },
        //             tablesCount: 25,
        //             maxSitsTable: 7,
        //             facilities: ["Seating Available", "Cash Accepted", "Cards Accepted"],
        //             cuisines: ["South Indian", "Italian", "Ukrainian"],
        //             approxCost: "30$",
        //             photos: ["https://cdn.discordapp.com/attachments/243025163774328832/506103582123360256/RD1.png"],
        //             famousFor: "Indian of Sanjeev Kapoor",
        //             reviews: ["review1", "review2" , "review3", "review4", "review5"],
        //             ownerId: "5bd495e5ab296e5698748411",
        //         }
        //     )
        // }
        // response.send("OK");
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
        response.json(200, {status: 'OK', message: 'Login is successful'})
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