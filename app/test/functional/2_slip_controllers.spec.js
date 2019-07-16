'use strict';

let app = require('../../app.js');
let request = require('supertest');
let chai = require('chai');

let expect = chai.expect;
const convenio1 = '84630000003-7 98930296201-8 90710003000-2 00356248299-6'
const titulo1 = '03399.21199 68400.000029 35050.501010 7 79440000047400'


chai.use(require('chai-things'));


describe('Slip controller test', function () {
    describe('.post - Post /', function () {
        it('typedData with short size should not be accepted test', function (done) {
            request(app)
                .post('/')
                .send('typedData=1234567891011121314') // x-www-form-urlencoded
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
        it('invalid form data key should be not accepted test', function (done) {
            request(app)
                .post('/')
                .send('typed=1234567891011121314') // x-www-form-urlencoded
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    expect(res.statusCode).to.be.equal(400);
                    expect(res.body).have.property('validData', false);
                    expect(res.body).have.property('amount', 0);
                    expect(res.body).have.property('barcode', null);
                    expect(res.body).have.property('dueDate', null);
                    expect(res.body).have.property('message', 'No data informed.');
                    done();
                });


        });
        it('should find out a titulo test', function (done) {
            request(app)
                .post('/')
                .send('typedData=' + titulo1) // x-www-form-urlencoded
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    expect(res.statusCode).to.be.equal(200);
                    expect(res.body).have.property('validData', true);
                    expect(res.body).have.property('amount', 474);
                    expect(res.body).have.property('barcode', "03397794400000474009211968400000023505050101");
                    expect(res.body).have.property('dueDate', "08/07/2019");
                    expect(res.body).have.property('message', 'Titulo successfully verified.');
                    done();
                });


        });
        it('should find out a convenio test', function (done) {
            request(app)
                .post('/')
                .send('typedData=' + convenio1) // x-www-form-urlencoded
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    expect(res.statusCode).to.be.equal(200);
                    expect(res.body).have.property('validData', true);
                    expect(res.body).have.property('amount', 398.93);
                    expect(res.body).have.property('barcode', "84630000003989302962019071000300000356248299");
                    expect(res.body).have.property('dueDate', "10/07/2019");
                    expect(res.body).have.property('message', 'Convenio successfully verified.');
                    done();
                });
        });


    });


});