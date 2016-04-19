'use strict';

/**
 * Phone model specification
 *
 * @description :: Server-side model specification for Phone
 */

//dependencies
var mongoose = require('mongoose');
var faker = require('faker');
var expect = require('chai').expect;
var Phone = mongoose.model('Phone');
var _phone_;


describe('Phone Model', function() {
    before(function(done) {
        var __phone__ = {
			phone: faker.random.number({ min:0}),
			ddd: faker.random.number({ min:0})
		};

        Phone.create(__phone__, function(error, phone) {
            _phone_ = phone;
            done(error, phone);
        });
    });

    
    it('should be able to create new phone', function(done) {
        var __phone__ = {
			phone: faker.random.number({ min:0}),
			ddd: faker.random.number({ min:0})
		};

        Phone.create(__phone__, function(error, phone) {
            
            expect(error).to.not.exist;
            expect(phone).to.exist;
            
            //TODO application specific assertions

            done(error, phone);
        });
    });

    
    it('should be able to find existing phone', function(done) {
        Phone.findById(_phone_._id, function(error, phone) {

            expect(error).to.not.exist;
            expect(phone).to.exist;
            
            //TODO application specific assertions
            
            done(error, phone);
        });
    });

    
    it('should be able to update existing phone', function(done) {
        var __phone__ = {
			phone: faker.random.number({ min:0}),
			ddd: faker.random.number({ min:0})
		};

        Phone.findByIdAndUpdate(_phone_._id, __phone__,{
            upsert: true,
            new: true
        }, function(error, phone) {
            //update phone references
            _phone_ = phone;

            expect(error).to.not.exist;
            expect(phone).to.exist;
            
            //TODO application specific assertions
            
            done(error, phone);
        });
    });

    
    it('should be able to delete existing phone', function(done) {
        Phone.findByIdAndRemove(_phone_._id, function(error, phone) {

            expect(error).to.not.exist;
            expect(phone).to.exist;
            
            //TODO application specific assertions
            
            done(error, phone);
        });
    });


    it('should be able to list existing phones', function(done) {
        Phone.paginate({
            page: 1,
            limit: 10
        }, function(error, phones, pages, total) {

            expect(error).to.not.exist;
            expect(pages).to.exist;
            expect(phones).to.exist;
            expect(total).to.exist;
            
            //TODO application specific assertions
            
            done(error, phones);
        });
    });


    //TODO alternative test specs

    
    after(function(done) {
        //TODO write spec cleanup
        done();
    });

});