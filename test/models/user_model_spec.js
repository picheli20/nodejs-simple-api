'use strict';

/**
 * User model specification
 *
 * @description :: Server-side model specification for User
 */

//dependencies
var mongoose = require('mongoose');
var expect = require('chai').expect;
var userGen = require('../user.generator.js');
var User = mongoose.model('User');
var _user_;

describe('User Model', function() {
    before(function(done) {
        var __user__ = userGen.getFakeUser();
        User.create(__user__, function(error, user) {
            _user_ = user;
            done(error, user);
        });
    });
    
    it('should be able to create new user', function(done) {
        var __user__ = userGen.getFakeUser();

        User.create(__user__, function(error, user) {
            
            expect(error).to.not.exist;
            expect(user).to.exist;
            
            //TODO application specific assertions

            done(error, user);
        });
    });

    it('should be able to find existing user', function(done) {
        User.findById(_user_._id, function(error, user) {

            expect(error).to.not.exist;
            expect(user).to.exist;
            
            //TODO application specific assertions
            
            done(error, user);
        });
    });

    it('should be able to update existing user', function(done) {
        var __user__ = userGen.getFakeUser();

        User.findByIdAndUpdate(_user_._id, __user__,{
            upsert: true,
            new: true
        }, function(error, user) {
            //update user references
            _user_ = user;

            expect(error).to.not.exist;
            expect(user).to.exist;

            //TODO application specific assertions

            done(error, user);
        });
    });

    it('should be able to list existing users', function(done) {
        User.paginate({
            page: 1,
            limit: 10
        }, function(error, users, pages, total) {

            expect(error).to.not.exist;
            expect(pages).to.exist;
            expect(users).to.exist;
            expect(total).to.exist;
            
            //TODO application specific assertions
            
            done(error, users);
        });
    });

    it('should be able to delete existing user', function(done) {
        User.findByIdAndRemove(_user_._id, function(error, user) {

            expect(error).to.not.exist;
            expect(user).to.exist;
            
            //TODO application specific assertions
            
            done(error, user);
        });
    });

    after(function(done) {
        //TODO write spec cleanup
        done();
    });

});