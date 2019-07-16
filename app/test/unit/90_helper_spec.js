'use strict';

let chai = require('chai');
let helper = require('../../controllers/helper');

let expect = chai.expect;

chai.use(require('chai-things'));

describe('Helper functions test', function () {
    describe('modulo 10 tests', function () {
        it('should calculate modulo 10', function (done) {
            let response = helper.moduloDez("000000000000000000000000000000");
            expect(response).to.be.equal ("0");
            done();
        });
        it('should calculate modulo 10', function (done) {
            let response = helper.moduloDez("1111111111111111111111111111111");
            expect(response).to.be.equal ("3");
            done();
        });
    });
    describe('modulo 11 tests', function () {
        it('should calculate modulo 11', function (done) {
            let response = helper.moduloOnze("000000000000000000000000000000");
            expect(response).to.be.equal ("1");
            done();
        });
        it('should calculate modulo 11', function (done) {
            let response = helper.moduloOnze("1111111111111111111111111111111");
            expect(response).to.be.equal ("9");
            done();
        });
    })

    describe('isNumeric tests', function () {
        it('should be numeric', function (done) {
            let response = helper.isNumeric("1234567890",10);
            expect(response).to.be.equal(true);
            done();
        });
        it('should not be numeric', function (done) {
            let response = helper.isNumeric("12E4567890",10) ;
            expect(response).to.be.equal(false);
            done();
        });
    })

});
