'use strict';
/**
 * User Router
 *
 * @description :: Server-side router for managing User.
 */

//dependencies
var path = require('path');
var express = require('express');
var router = express.Router();
var controller = require(path.join(__dirname, '..', 'controllers', 'user_controller'));

/**
 * Handle Http GET on /users
 * @description display a list of all users
 * @param  {HttpRequest} request  a http request
 * @param  {HttpResponse} response a http response
 */
router.get('/users', function(request, response, next) {
    controller.index(request, response, next);
});


/**
 * Handle Http POST on /users
 * @description create a new user
 * @param  {HttpRequest} request  a http request
 * @param  {HttpResponse} response a http response
 */
router.post('/signup', function(request, response, next) {
    controller.create(request, response, next);
});

/**
 * Handle Http POST on /signin
 * @description authenticate user and return authentication token
 * @param  {HttpRequest} request  a http request
 * @param  {HttpResponse} response a http response
 */
router.post('/signin', function(request, response, next) {
    controller.signin(request, response, next);
});


/**
 * exports users router
 * @type {Object}
 */
module.exports = router;