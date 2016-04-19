'use strict';

/**
 * User router specification
 *
 * @description :: Server-side router specification for User
 */

//dependencies
var path = require('path');
var expect = require('chai').expect;
var faker = require('faker');
var request = require('supertest');
var app = require(path.join(__dirname, '..', '..', 'app', 'application'));
var user;

describe('User Router', function() {
    before(function(done) {
        var _user_ = {
			name: faker.lorem.words(1)[0],
			email: faker.lorem.words(1)[0],
			password: faker.lorem.words(1)[0],
		};

        request(app)
            .post('/users')
            .send(_user_)
            .set('Accept', 'application/json')
            .expect(201)
            .expect('Content-Type', /json/)
            .end(function(error, response) {
                user = JSON.parse(response.text);
                done(error, response);
            });
    });
    
    it('should be able to create new user when http post on /users', function(done) {
        var _user_ = {
			name: faker.lorem.words(1)[0],
			email: faker.lorem.words(1)[0],
			password: faker.lorem.words(1)[0],
		};
        
        request(app)
            .post('/users')
            .send(_user_)
            .set('Accept', 'application/json')
            .expect(201)
            .expect('Content-Type', /json/)
            .end(function(error, response) {

                expect(error).to.not.exist;
                expect(response).to.exist;
                
                //TODO more user response assertions

                done(error, response);
            });
    });

    
    it('should be able to find user when http get on /users/:id', function(done) {
        request(app)
            .get('/users/'+ user._id)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(error, response) {

                expect(error).to.not.exist;
                expect(response).to.exist;

                //TODO more user response assertions

                done(error, response);
            });
    });

    
    it('should be able to update existing user when http put on /users/:id', function(done) {
        var _user_ = {
			name: faker.lorem.words(1)[0],
			email: faker.lorem.words(1)[0],
			password: faker.lorem.words(1)[0],
		};

        request(app)
            .put('/users/'+ user._id)
            .send(_user_)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(error, response) {

                expect(error).to.not.exist;
                expect(response).to.exist;

                //TODO more user response assertions

                done(error, response);
            });
    });

    
    it('should be able to update existing user when http patch on /users/:id', function(done) {
        var _user_ = {
			name: faker.lorem.words(1)[0],
			email: faker.lorem.words(1)[0],
			password: faker.lorem.words(1)[0],
		};

        request(app)
            .patch('/users/'+ user._id)
            .send(_user_)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(error, response) {

                expect(error).to.not.exist;
                expect(response).to.exist;

                //TODO more user response assertions

                done(error, response);
            });
    });

    
    it('should be able to delete existing user when http delete on /users/:id', function(done) {
       request(app)
            .delete('/users/'+ user._id)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(error, response) {

                expect(error).to.not.exist;
                expect(response).to.exist;

                //TODO more user response assertions

                done(error, response);
            });
    });


    it('should be able to list users when http get on /users', function(done) {
        request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(error, response) {

                expect(error).to.not.exist;
                expect(response).to.exist;

                //TODO more users response assertions

                done(error, response);
            });
    });


    after(function(done) {
        //TODO write spec cleanup
        done();
    });

});