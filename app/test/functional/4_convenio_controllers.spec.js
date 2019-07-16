'use strict';

let app = require('../../app.js');
let request = require('supertest');
let chai = require('chai');

let expect = chai.expect;
const titulo1 = '84630000003-7 98930296201-8 90710003000-2 00356248299-6'
const titulo2 = '8463000000E-7 98930296201-8 90710003000-2 00356248299-6' //letter
const titulo3 = '84630000003-6 98930296201-8 90710003000-2 00356248299-6' //wrong dv1
const titulo4 = '84630000003-7 98930296201-3 90710003000-2 00356248299-6' //wrong dv2
const titulo5 = '84630000003-7 98930296201-8 90710003000-1 00356248299-6' //wrong dv3
const titulo6 = '84630000003-7 98930296201-8 90710003000-2 00356248299-2' //wrong dv4
const titulo7 = '14630000003-7 98930296201-8 90710003000-2 00356248299-6' //wrong product
const titulo8 = '88630000003-7 98930296201-8 90710003000-2 00356248299-6' //wrong segment
const titulo9 = '84130000003-7 98930296201-8 90710003000-2 00356248299-6' //wrong real value
const titulo10 = '84640000003-6 98930296201-8 90710003000-2 00356248299-6' //invalid general dv


chai.use(require('chai-things'));


describe('Convenio controller test', function () {
    describe('.post - Post /', function () {
        it('should deny invalid typedData (with letters) test', function (done) {
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
        it('should deny wrong dv1 test', function (done) {
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
                    expect(res.body).have.property('message', 'Invalid field1.');
                    done();
                });
        });
        it('should deny wrong dv2 test', function (done) {
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
                    expect(res.body).have.property('message', 'Invalid field2.');
                    done();
                });
        });
        it('should deny wrong dv3 test', function (done) {
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
                    expect(res.body).have.property('message', 'Invalid field3.');
                    done();
                });
        });
        it('should deny wrong dv4 test', function (done) {
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
                    expect(res.body).have.property('message', 'Invalid field4.');
                    done();
                });
        });
        it('should deny invalid product test', function (done) {
            request(app)
                .post('/')
                .send('typedData=' + titulo7) // x-www-form-urlencoded
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    expect(res.statusCode).to.be.equal(400);
                    expect(res.body).have.property('validData', false);
                    expect(res.body).have.property('amount', 0);
                    expect(res.body).have.property('barcode', null);
                    expect(res.body).have.property('dueDate', null);
                    expect(res.body).have.property('message', 'Invalid product.');
                    done();
                });
        });
        it('should deny invalid segment test', function (done) {
            request(app)
                .post('/')
                .send('typedData=' + titulo8) // x-www-form-urlencoded
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    expect(res.statusCode).to.be.equal(400);
                    expect(res.body).have.property('validData', false);
                    expect(res.body).have.property('amount', 0);
                    expect(res.body).have.property('barcode', null);
                    expect(res.body).have.property('dueDate', null);
                    expect(res.body).have.property('message', 'Invalid segment.');
                    done();
                });
        });
        it('should deny invalid real value test', function (done) {
            request(app)
                .post('/')
                .send('typedData=' + titulo9) // x-www-form-urlencoded
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    expect(res.statusCode).to.be.equal(400);
                    expect(res.body).have.property('validData', false);
                    expect(res.body).have.property('amount', 0);
                    expect(res.body).have.property('barcode', null);
                    expect(res.body).have.property('dueDate', null);
                    expect(res.body).have.property('message', 'Invalid real or reference amount Id.');
                    done();
                });
        });
        it('should deny invalid general dv test', function (done) {
            request(app)
                .post('/')
                .send('typedData=' + titulo10) // x-www-form-urlencoded
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


    });


});
