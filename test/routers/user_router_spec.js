'use strict';

/**
 * User router specification
 *
 * @description :: Server-side router specification for User
 */

//dependencies
var path = require('path');
var expect = require('chai').expect;
var assert = require('chai').assert;
var request = require('supertest');
var app = require(path.join(__dirname, '..', '..', 'app', 'application'));
var userGen = require('../user.generator.js');
var user, password;


describe('User Router', function() {
    before(function(done) {
        var _user_ = userGen.getFakeUser();
        password = _user_.senha;
        request(app)
            .post('/signup')
            .send(_user_)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(error, response) {
                user = JSON.parse(response.text);
                done(error, response);
                expect(error).to.not.exist;
            });
    });

    describe('Singup', function() {
        it('should not be able to create new user without email', function(done) {
            var _user_ = userGen.getFakeUser();
            delete _user_.email;

            request(app)
                .post('/signup')
                .send(_user_)
                .set('Accept', 'application/json')
                .expect(400)
                .expect('Content-Type', /json/)
                .end(function(error, response) {

                    expect(error).to.not.exist;
                    expect(response.body).to.exist;
                    
                    //TODO more user response assertions
                    expect(response.body.success).to.exist;
                    expect(response.body.message).to.exist;
                    assert.equal(false, response.body.success);

                    done(error, response);
                });
        });

        it('should not be able to create new user with a current email', function(done) {
            var _user_ = userGen.getFakeUser();
            _user_.email = user.email;

            request(app)
                .post('/signup')
                .send(_user_)
                .set('Accept', 'application/json')
                .expect(401)
                .expect('Content-Type', /json/)
                .end(function(error, response) {

                    expect(error).to.not.exist;
                    expect(response.body).to.exist;
                    
                    //TODO more user response assertions
                    expect(response.body.success).to.exist;
                    expect(response.body.message).to.exist;
                    assert.equal(false, response.body.success);

                    done(error, response);
                });
        });

        it('should not be able to create new user without password', function(done) {
            var _user_ = userGen.getFakeUser();
            delete _user_.senha;

            request(app)
                .post('/signup')
                .send(_user_)
                .set('Accept', 'application/json')
                .expect(400)
                .expect('Content-Type', /json/)
                .end(function(error, response) {

                    expect(error).to.not.exist;
                    expect(response.body).to.exist;
                    
                    //TODO more user response assertions
                    expect(response.body.success).to.exist;
                    expect(response.body.message).to.exist;
                    assert.equal(false, response.body.success);

                    done(error, response);
                });
        });

        it('should not be able to create new user', function(done) {
            var _user_ = userGen.getFakeUser();

            request(app)
                .post('/signup')
                .send(_user_)
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(error, response) {

                    expect(error).to.not.exist;
                    expect(response.body).to.exist;
                    
                    //TODO more user response assertions
                    expect(response.body.id).to.exist;
                    /* jshint ignore:start */ 
                    expect(response.body.data_criacao).to.exist;
                    expect(response.body.data_atualizacao).to.exist;
                    expect(response.body.ultimo_login).to.exist;
                    /* jshint ignore:end */ 
                    expect(response.body.token).to.exist;
                    expect(response.body.email).to.exist;
                    done(error, response);
                });
        });
    });


    describe('Singin', function() {

        it('should be able login with a created user', function(done) {
            var _user_ = {
                'email' : user.email,
                'senha' : password,
            };
            
            request(app)
                .post('/signin')
                .send(_user_)
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(error, response) {
                    console.log(response.body);
                    expect(error).to.not.exist;
                    expect(response.body).to.exist;
                    
                    //TODO more user response assertions
                    expect(response.body.id).to.exist;
                    /* jshint ignore:start */ 
                    expect(response.body.data_criacao).to.exist;
                    expect(response.body.data_atualizacao).to.exist;
                    expect(response.body.ultimo_login).to.exist;
                    /* jshint ignore:end */ 
                    expect(response.body.token).to.exist;
                    expect(response.body.email).to.exist;
                    done(error, response);
                });
        });

        it('should not be able login without a password', function(done) {
            var _user_ = {
                'email' : user.email,
                'senha' : '',
            };
            
            request(app)
                .post('/signin')
                .send(_user_)
                .set('Accept', 'application/json')
                .expect(400)
                .expect('Content-Type', /json/)
                .end(function(error, response) {

                    expect(error).to.not.exist;
                    expect(response.body).to.exist;
                    
                    //TODO more user response assertions
                    expect(response.body.success).to.exist;
                    expect(response.body.message).to.exist;
                    assert.equal(false, response.body.success);

                    done(error, response);
                });
        });

        it('should not be able login without a email', function(done) {
            var _user_ = {
                'email' : '',
                'senha' : password,
            };
            
            request(app)
                .post('/signin')
                .send(_user_)
                .set('Accept', 'application/json')
                .expect(400)
                .expect('Content-Type', /json/)
                .end(function(error, response) {

                    expect(error).to.not.exist;
                    expect(response.body).to.exist;
                    
                    //TODO more user response assertions
                    expect(response.body.success).to.exist;
                    expect(response.body.message).to.exist;
                    assert.equal(false, response.body.success);

                    done(error, response);
                });
        });

        it('should not be able login with a fake email', function(done) {
            var _user_ = {
                'email' : 'fakeemail@123.com',
                'senha' : password,
            };
            
            request(app)
                .post('/signin')
                .send(_user_)
                .set('Accept', 'application/json')
                .expect(401)
                .expect('Content-Type', /json/)
                .end(function(error, response) {

                    expect(error).to.not.exist;
                    expect(response.body).to.exist;
                    
                    //TODO more user response assertions
                    expect(response.body.success).to.exist;
                    expect(response.body.message).to.exist;
                    assert.equal(false, response.body.success);

                    done(error, response);
                });
        });

    });

    describe('Singin', function() {

        it('should be able search users', function(done) {
            
            request(app)
                .get('/users')
                .send({})
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer '+ user.token)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(error, response) {
                    expect(error).to.not.exist;
                    expect(response.body).to.exist;
                    
                    //TODO more user response assertions
                    expect(response.body.pages).to.exist;
                    expect(response.body.count).to.exist;
                    expect(response.body.users).to.exist;

                    done(error, response);
                });
        });

    });

/*  
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
*/

    after(function(done) {
        //TODO write spec cleanup
        done();
    });

});