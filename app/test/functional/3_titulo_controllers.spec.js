'use strict';

let app = require('../../app.js');
let request = require('supertest');
let chai = require('chai');

let expect = chai.expect;
const titulo1 = '03399.21199 68400.000029 35050.501010 7 79440000047400' //ok
const titulo2 = '11199.21199 68400.000029 35050.501010 7 79440000047400' //bank = 111
const titulo3 = '03359.21199 68400.000029 35050.501010 7 79440000047400' //currency = 5
const titulo4 = '03399.21193 68400.000029 35050.501010 7 79440000047400' //invalid field1 DV
const titulo5 = '03399.21199 68400.000022 35050.501010 7 79440000047400' //invalid field2 DV
const titulo6 = '03399.21199 68400.000029 35050.501015 7 79440000047400' //invalid field3 DV
const titulo7 = '23792.40308 90000.871286 57003.613700 4 79460000122399' //amount = 1233,99

chai.use(require('chai-things'));


describe('Titulo controller', function () {
    describe('.post - Post /', function () {
        it('invalid bank testing', function (done) {
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
                    expect(res.body).have.property('message', 'Invalid bank code.');
                    done();
                });


        });
        it('invalid currency testing', function (done) {
            request(app)
                .post('/')
                .send('typedData=' + titulo3) // x-www-form-urlencoded
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    expect(res.statusCode).to.be.equal(400);
                    expect(res.body).have.property('validData', false);
                    expect(res.body).have.property('amount', 0);
                    expect(res.body).have.property('barcode', null);
                    expect(res.body).have.property('dueDate', null);
                    expect(res.body).have.property('message', 'Invalid currency code.');
                    done();
                });


        });
        it('invalid field1 dv testing', function (done) {
            request(app)
                .post('/')
                .send('typedData=' + titulo4) // x-www-form-urlencoded
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    expect(res.statusCode).to.be.equal(400);
                    expect(res.body).have.property('validData', false);
                    expect(res.body).have.property('amount', 0);
                    expect(res.body).have.property('barcode', null);
                    expect(res.body).have.property('dueDate', null);
                    expect(res.body).have.property('message', 'Invalid field1.');
                    done();
                });


        });
        it('invalid field2 dv testing', function (done) {
            request(app)
                .post('/')
                .send('typedData=' + titulo5) // x-www-form-urlencoded
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    expect(res.statusCode).to.be.equal(400);
                    expect(res.body).have.property('validData', false);
                    expect(res.body).have.property('amount', 0);
                    expect(res.body).have.property('barcode', null);
                    expect(res.body).have.property('dueDate', null);
                    expect(res.body).have.property('message', 'Invalid field2.');
                    done();
                });


        });
        it('invalid field3 dv testing', function (done) {
            request(app)
                .post('/')
                .send('typedData=' + titulo6) // x-www-form-urlencoded
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    expect(res.statusCode).to.be.equal(400);
                    expect(res.body).have.property('validData', false);
                    expect(res.body).have.property('amount', 0);
                    expect(res.body).have.property('barcode', null);
                    expect(res.body).have.property('dueDate', null);
                    expect(res.body).have.property('message', 'Invalid field3.');
                    done();
                });


        });
        it('check amount', function (done) {
            request(app)
                .post('/')
                .send('typedData=' + titulo7) // x-www-form-urlencoded
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    expect(res.statusCode).to.be.equal(200);
                    expect(res.body).have.property('validData', true);
                    expect(res.body).have.property('amount', 1223.99);
                    expect(res.body).have.property('barcode', "23794794600001223992403090000871285700361370");
                    expect(res.body).have.property('dueDate', "10/07/2019");
                    expect(res.body).have.property('message', 'Titulo successfully verified.');
                    done();
                });


        });

    });


});