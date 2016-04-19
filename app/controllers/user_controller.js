'use strict';

//dependencies
var path = require('path');
var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var async = require('async');
var JWT = require(path.join(__dirname, '..', 'libs', 'jwt'));

/**
 * User Controller
 *
 * @description :: Server-side logic for managing User.
 */
module.exports = {
    /**
     * @function
     * @name users.index()
     * @description display a list of all users
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    index: function(request, response, next) {
        User.list(request, function(error, results) {
                    if (error) {
                        next(error);
                    } else {
                        response.json(results);
                    }
                });
    },

    
    /**
     * @function
     * @name users.create()
     * @description create a new user
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    create: function(request, response, next) {
        request.body.password = request.body.senha;
        delete request.body.senha;

        if (_.isEmpty(request.body) || _.isEmpty(request.body.email) || _.isEmpty(request.body.password)) {
            next(new Error('Invalid create details'));
            return;
        }

        User.find({ 'email': request.body.email }, function (err, resp) {
            if(resp.length > 0){
                next(new Error('Email already in use'));
            }else{
                var toCreateUser = new User(request.body);
                
                toCreateUser.save(function(err, newUser) {
                    if (err) {
                        next(err);
                    }else{
                        response.json(newUser);
                    }
                });

            }
        });
    },



    /**
     * @description authenticate provided credentials and generate jwt
     * @param  {HttpRequest} request  http request
     * @param  {HttpResponse} response http response
     */
    signin: function(request, response, next){
        //prevent invalid signin details
        if (_.isEmpty(request.body) || _.isEmpty(request.body.email) || _.isEmpty(request.body.password)) {
            next(new Error('Invalid signin details'));
            return;
        }

        //normalize email
        request.body.email = request.body.email.toLowerCase();

        async.waterfall([
            function authenticateUser(then) {
                User.authenticate(request.body, then);
            },

            function encodeUserToJWT(User, then) {
                JWT.encode(User, function afterEncode(error, jwtToken) {
                    if (error) {
                        then(error);
                    } else {
                        then(null, {
                            User: User,
                            token: jwtToken
                        });
                    }
                });
            }

        ],
        function done(error, result) {
            //fail to authenticate User
            //return error message
            if (error) {
                // Set forbidden status code
                error.status = 403;

                next(error);
            }

            //User authenticated successfully
            //token generated successfully 
            else {
                response.ok({
                    success: true,
                    User: result.User,
                    token: result.token
                });
            }

        });

    },


    /**
     * @function
     * @name users.show()
     * @description display a specific user
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    show: function(request, response, next) {
        User.findById(request.params.id, function(error, user) {
                if (error) {
                    next(error);
                } else {
                    response.json(user);
                }
            });
    },


    /**
     * @function
     * @name users.update()
     * @description update a specific user
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    update: function(request, response, next) {
        User.findByIdAndUpdate(
                request.params.id,
                request.body,
                {upsert:true,new:true},
                function(error, user) {
                    if (error) {
                        next(error);
                    } else {
                        response.json(user);
                    }
                });
    },


    /**
     * @function
     * @name users.destroy()
     * @description delete a specific user
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    destroy: function(request, response, next) {
        User.findByIdAndRemove(
                request.params.id,
                function(error, user) {
                    if (error) {
                        next(error);
                    } else {
                        response
                            .json(user);
                    }
                });
    }

};