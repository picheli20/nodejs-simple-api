'use strict';

/**
 * User controller specification
 *
 * @description :: Server-side controller specification for User
 */

//dependencies
var path = require('path');
var expect = require('chai').expect;
var faker = require('faker');
var respond = require('express-respond')();
var Request = require('mock-express-request');
var Response = require('mock-express-response');
var UserController = require(path.join(__dirname, '..', '..', 'app', 'controllers', 'user_controller'));

var _user_;

describe('User Controller', function() {
    before(function(done) {
        var __user__ = {
			name: faker.lorem.words(1)[0],
			email: faker.lorem.words(1)[0],
			password: faker.lorem.words(1)[0],
		};

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            },
            body: __user__
        });

        var response = new Response({
            request: request,
            finish: function() {
                _user_ = response._getJSON();
                //TODO handle response errors
                done();
            }
        });

        //patch response with respond methods
        respond(request,response,function(){});

        UserController.create(request, response);
    });


    it('should be able to create new user on UserController#create', function(done) {
        var __user__ = {
			name: faker.lorem.words(1)[0],
			email: faker.lorem.words(1)[0],
			password: faker.lorem.words(1)[0],
		};

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            },
            body: __user__
        });

        var response = new Response({
            request: request,
            finish: function() {
                var __user = response._getJSON();

                //TODO handle response errors
                expect(response.statusCode).to.be.equal(201);

                expect(__user).to.not.be.null;
                expect(__user).to.not.be.undefined;
                expect(__user._id).to.exist;

                //TODO application specific assertions

                done();
            }
        });

        //patch response with respond methods
        respond(request,response,function(){});

        UserController.create(request, response);
    });

	
    it('should be able to find existing user on UserController#show', function(done) {
        var request = new Request({
            headers: {
                'Accept': 'application/json'
            },
            params: {
                id: _user_._id
            }
        });

        var response = new Response({
            request: request,
            finish: function() {
                var __user = response._getJSON();

                expect(response.statusCode).to.be.equal(200);

                expect(__user).to.not.be.null;
                expect(__user).to.not.be.undefined;
                expect(__user._id).to.exist;

                //TODO application specific assertions

                done();
            }
        });

        //patch response with respond methods
        respond(request,response,function(){});

        UserController.show(request, response);
    });
    

    it('should be able to update existing user on UserController#update', function(done) {
        var __user__ = {
			name: faker.lorem.words(1)[0],
			email: faker.lorem.words(1)[0],
			password: faker.lorem.words(1)[0],
		};

        var request = new Request({
            headers: {
                'Accept': 'application/json'
            },
            params: {
                id: _user_._id
            },
            body: __user__
        });

        var response = new Response({
            request: request,
            finish: function() {
                var __user = response._getJSON();

                expect(response.statusCode).to.be.equal(200);

                expect(__user).to.not.be.null;
                expect(__user).to.not.be.undefined;
                expect(__user._id).to.exist;

                //TODO application specific assertions

                done();
            }
        });

        //patch response with respond methods
        respond(request,response,function(){});

        UserController.update(request, response);

    });

    
    it('should be able to delete existing user on UserController#destroy', function(done) {
        var request = new Request({
            headers: {
                'Accept': 'application/json'
            },
            params: {
                id: _user_._id
            }
        });

        var response = new Response({
            request: request,
            finish: function() {
                var __user = response._getJSON();

                expect(response.statusCode).to.be.equal(200);

                expect(__user).to.not.be.null;
                expect(__user).to.not.be.undefined;
                expect(__user._id).to.exist;

                //TODO application specific assertions

                done();
            }
        });

        //patch response with respond methods
        respond(request,response,function(){});

        UserController.destroy(request, response);
    });


     it('should be able to list existing users on UserController#index', function(done) {
       var request = new Request({
            headers: {
                'Accept': 'application/json'
            },
            query: {
                page: 1,
                limit: 10
            }
        });

        var response = new Response({
            request: request,
            finish: function() {
                var _data = response._getJSON();

                expect(_data).to.not.be.undefined;
                expect(_data).to.not.be.null;
                expect(_data.users.length).to.exist;

                //TODO application specific assertions

                done();
            }
        });

        //patch response with respond methods
        respond(request,response,function(){});

        UserController.index(request, response);

    });

    
    after(function(done) {
        //TODO write spec cleanup
        done();
    });

});