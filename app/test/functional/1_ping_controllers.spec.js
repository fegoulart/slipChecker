'use strict';

let app = require('../../app.js');
let request = require('supertest');
let chai=require('chai');

let expect = chai.expect;

chai.use(require('chai-things'));

describe('Ping controller', function(){
    describe('.get - Get /ping', function(){
        it('should answer', function(done) {
            request(app)
                .get('/ping')
                .end(function(err,res){
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).have.property('message','All good. Go back to bed.' );
                    done();
                });
        });
    });


});