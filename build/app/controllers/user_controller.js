'use strict';

//dependencies
var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var config = require('config');
var bcrypt = require('bcrypt'); 
var jwt = require('jsonwebtoken');

function formatUserOutput(user){
    return {
        'id' : user._id,
        'data_criacao' : user.dataCriacao,
        'data_atualizacao' : user.dataAtualizacao,
        'ultimo_login' : user.ultimoLogin,
        'token' : user.token,
        'email' : user.email
    };
}

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

        if (_.isEmpty(request.body) || _.isEmpty(request.body.email) || _.isEmpty(request.body.senha)) {
            var err = new Error('Favor informar e-mail/senha');
            err.status = 400;
            next(err);
            return;
        }

        User.find({ 'email': request.body.email }, function (error, resp) {
            if(resp.length > 0){
                var err = new Error('E-mail já existente');
                err.status = 401;
                next(err);
            }else{
                var toCreateUser = new User(request.body);
                var token = jwt.sign({ email : toCreateUser.email, date: new Date().getTime() }, config.magicWord, { 'expiresIn' : config.tokenExpiration});
                toCreateUser.token = token;
                toCreateUser.ultimoLogin = new Date().toISOString();

                toCreateUser.save(function(error, newUser) {
                    if (error) {
                        next(error);
                    }else{
                        response.json(formatUserOutput(newUser));
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
        //prevent Favor informar email e senha
        if (_.isEmpty(request.body) || _.isEmpty(request.body.email) || _.isEmpty(request.body.senha)) {
            var err = new Error('Favor informar email e senha');
            err.status = 400;
            next(err);
            return;
        }

        //normalize email
        request.body.email = request.body.email.toLowerCase();

        User.find({ 'email': request.body.email }, function (error, resp) {
            if(resp.length === 0){
                var err = new Error('Usuário e/ou senha inválidos');
                err.status = 401;
                next(err);
            }else if(resp.length === 1){
                var userCandidate = resp[0];
                //config.magicWord;
                //config.SALT_WORK_FACTOR;
                if(bcrypt.compareSync(request.body.senha, userCandidate.senha)){
                    var token = jwt.sign({ email : userCandidate.email, date: new Date().getTime() }, config.magicWord, { 'expiresIn' : config.tokenExpiration});
                    userCandidate.token = token;
                    userCandidate.ultimoLogin = new Date().toISOString();
                    userCandidate.save();
                    response.json(formatUserOutput(userCandidate));
                }else{
                    var err2 = new Error('Usuário e/ou senha inválidos');
                    err2.status = 401;
                    next(err2);
                }
            }
        });
    },
};