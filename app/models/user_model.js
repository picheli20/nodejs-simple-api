'use strict';

/**
 * User model
 *
 * @description :: Server-side model for managing User
 */

//dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var irina = require('irina');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;




//User Schema
var UserSchema = new Schema({
    
    /**
     * @name nome
     * @description nome 
     * @type {Object}
     * @private
     */
    nome: {
    
        type: String,
        required: true
    
    },
    
    /**
     * @name email
     * @description email 
     * @type {Object}
     * @private
     */
    email: {
    
        type: String,
        required: true,
        lowercase: true,
        trim: true
    
    },
    
    /**
     * @name token
     * @description token 
     * @type {Object}
     * @private
     */
    token: {
    
        type: String
    
    },
    
    /**
     * @name password
     * @description password 
     * @type {Object}
     * @private
     */ 
    password: {
    
        type: String,
        required: true
    
    },


    /**
     * @name telefones
     * @description telefones 
     * @type {Object}
     * @private
     */

    telefones:[
      {type: Schema.Types.Mixed}
    ]
    
});

UserSchema.virtual('id').get(function() { return this._id; });
UserSchema.virtual('data_criacao').get(function() { return this.createdAt; });
UserSchema.virtual('data_atualizacao').get(function() { return this.updatedAt; });

// Ensure virtual fields are serialised.
UserSchema.set('toJSON', {
    virtuals: true
}, function(fields){
    console.log(fields);
    return fields;
});

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('senha')){
        return next();
    }

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err){
            return next(err);
        }

        // hash the password using our new salt
        bcrypt.hash(user.senha, salt, function(err, hash) {
            if (err){
                return next(err);
            }

            // override the cleartext password with the hashed one
            user.senha = hash;
            next();
        });
    });
});

//apply UserSchema level plugins
    //plugin irina for authentication workflows
    //UserSchema.plugin(irina);

//exports User model
module.exports = mongoose.model('User', UserSchema);