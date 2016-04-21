'use strict';

var faker = require('faker');

module.exports = {
    getFakesNumbers: function(randNum){
        var phones = [];
        for (var i = 0; i < randNum; i++) {
            phones.push({
                'numero' : faker.random.number({ max : 9, min : 8}),
                'ddd' : faker.random.number({ max : 3, min : 3})
            });
        }
    },
    getFakeUser: function(){
        var self = this;
        return {
            nome: faker.name.findName(),
            email: faker.internet.email(),
            senha: faker.lorem.words(1)[0],
            token: faker.lorem.words(1)[0],
            ultimoLogin: faker.date.recent(),
            telefones: self.getFakesNumbers(faker.random.number({ max : 9, min : 0}))
        };
    }
};