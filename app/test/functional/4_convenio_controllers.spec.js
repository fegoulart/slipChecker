'use strict';

let app = require('../../app.js');
let request = require('supertest');
let chai = require('chai');

let expect = chai.expect;
const titulo1 = '84630000003-7 98930296201-8 90710003000-2 00356248299-6'
const titulo2 = '8463000000E-7 98930296201-8 90710003000-2 00356248299-6'

chai.use(require('chai-things'));


describe('Convenio controller', function () {
    describe('.post - Post /', function () {
        it('should deny char título', function (done) {
            request(app)
                .post('/')
                .send('typedData=' + titulo2) // x-www-form-urlencoded
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    expect(res.statusCode).to.be.equal(400);
                    expect(res.body).have.property('validData', false);
                    expect(res.body).have.property('amount', 0);
                    expect(res.body).have.property('barcode', null);
                    expect(res.body).have.property('dueDate', null);
                    expect(res.body).have.property('message', 'Invalid data.');
                    done();
                });
        });

    });


});