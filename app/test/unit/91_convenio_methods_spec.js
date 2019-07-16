'use strict';

let chai = require('chai');
let convenio = require('../../controllers/convenio');
let moment = require('moment');

let expect = chai.expect;

chai.use(require('chai-things'));

describe('Convenio functions test', function () {
    describe('isDate', function () {
        it('should be a date', function (done) {
            let response = convenio.isDate("19780514");
            expect(response).to.be.equal(true);
            done();
        });
        it('19781405 should not be a date', function (done) {
            let response = convenio.isDate("19781405");
            expect(response).to.be.equal(false);
            done();
        });
        it('14052020 should not be a date', function (done) {
            let response = convenio.isDate("14052020");
            expect(response).to.be.equal(false);
            done();
        });
    })


    describe('getduedate tests', function () {
        it('should get due date', function (done) {
            let response = convenio.getConvenioDueDate("20201231");
            expect(response.format("DD/MM/YYYY")).to.be.equal("31/12/2020");
            done();
        });
        it('should not get due date', function (done) {
            let response = convenio.getConvenioDueDate("31122020");
            expect(response).to.be.equal(null);
            done();
        });
    })



});