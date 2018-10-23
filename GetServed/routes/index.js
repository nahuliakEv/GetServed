'use strict';
var express = require('express');
var router = express.Router();

var isAuthenticated = function (request, response, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (request.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = (passport) => {
    router.get('/', (request, response) => {
        response.render('index', { title: 'Express' });
    });
    
    router.post("/login", passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true
    }));
    
    router.get('/registration', (request, response) => {
        response.send('registration page');
    });
    
    router.post('/registration', passport.authenticate('registration', {
        successRedirect: '/home',
        failureRedirect: '/registration',
        failureFlash: true
    }));

    
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

    router.get('/login/twitter/callback', passport.authenticate('twitter', {
        successRedirect : '/home',
        failureRedirect : '/'
    })
);

    return router;

}