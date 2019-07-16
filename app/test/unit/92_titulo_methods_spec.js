'use strict';

let chai = require('chai');
let titulo = require('../../controllers/titulo');
let moment = require('moment');
let config = require('../../config');
let expect = chai.expect;

chai.use(require('chai-things'));

describe('Titulo functions test', function () {
    describe('isDate', function () {
        it('should get a Titulo due date', function (done) {
            let response = titulo.getTituloDueDate(7896, new Date(config().tituloBaseDate));
            expect(response.format("DD/MM/YYYY")).to.be.equal("21/05/2019");
            done();
        });
        it('should get another Titulo due date', function (done) {
            let response = titulo.getTituloDueDate(4869, new Date(config().tituloBaseDate));
            expect(response.format("DD/MM/YYYY")).to.be.equal("05/02/2011");
            done();
        });
    })
    describe('barcodeBuilder', function () {
        it('should get a barcode test', function (done) {
            let response = titulo.barcodeBuilder("341","9","6000","00047454","123454");
            expect(response).to.be.equal("34199600000047454123454");
            done();
        });
        it('should not get a barcode test', function (done) {
            let response = titulo.barcodeBuilder(341,9,6000,474.54,123454);
            expect(response).to.be.equal(null);
            done();
        });
    })
    describe('isABank test', function () {
        it('"341" should be a Bank test', function (done) {
            let response =  titulo.isABank("341",titulo.brazilianBanks);
            expect(response).to.be.equal(true);
            done();
        });
        it('341 should be a Bank test', function (done) {
            let response =  titulo.isABank(341,titulo.brazilianBanks);
            expect(response).to.be.equal(false);
            done();
        });
        it('should not be a Bank test', function (done) {
            let response =  titulo.isABank(111,titulo.brazilianBanks);
            expect(response).to.be.equal(false);
            done();
        });
    })
    describe('isValidCurrency test', function () {
        it('"9" should be a valid currency', function (done) {
            let response =  titulo.isValidCurrency("9",titulo.currencies);
            expect(response).to.be.equal(true);
            done();
        })
        it('9 should be a valid currency', function (done) {
            let response =  titulo.isValidCurrency(9,titulo.currencies);
            expect(response).to.be.equal(false);
            done();
        })
        it('"7" should be a valid currency', function (done) {
            let response =  titulo.isValidCurrency("7",titulo.currencies);
            expect(response).to.be.equal(false);
            done();
        })
    })


});

/*





function isValidCurrency(currency, currenciesArray) {
    try {
        if (currenciesArray.includes(currency)) {
            return true
        }
        return false
    } catch (err) {
        console.log("Titulo isABank error " + err.name + " - " + err.message);
        return false
    }
}*/
