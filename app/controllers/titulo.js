'use strict';

let moment = require('moment');
let config = require('../config'); // get our config file
let helper = require('./helper');


let brazilianBanks = ["654", "246", "025", "641", "213", "019", "029", "000", "740", "107", "031", "739", "096", "318", "752", "248", "218", "065", "036", "204", "394", "237", "225", "M15", "208", "044", "263", "473", "412", "040", "745", "M08", "241", "M19", "215", "756", "748", "075", "721", "222", "505", "229", "266", "003", "083", "M21", "707", "300", "495", "494", "M06", "024", "456", "214", "001", "047", "037", "039", "041", "004", "265", "M03", "224", "626", "M18", "233", "734", "M07", "612", "M22", "063", "M11", "604", "320", "653", "630", "077", "249", "M09", "184", "479", "376", "074", "217", "076", "757", "600", "212", "M12", "389", "746", "M10", "738", "066", "243", "045", "M17", "623", "611", "613", "094", "643", "724", "735", "638", "M24", "747", "088", "356", "633", "741", "M16", "072", "453", "422", "033", "250", "743", "749", "366", "637", "012", "464", "082", "M20", "M13", "634", "M14", "M23", "655", "610", "370", "021", "719", "755", "744", "073", "078", "069", "070", "092", "104", "477", "081", "097", "085", "099", "090", "089", "087", "098", "487", "751", "064", "062", "399", "168", "492", "652", "341", "079", "488", "014", "753", "086", "254", "409", "230", "091", "084"];
let currencies = ["9"]

module.exports = {
    read: read
};

/***
 * Converts factor to a moment Date
 * @param factor
 * @param baseDate
 * @returns {null|moment.Moment}
 */
function getDueDate(factor, baseDate) {
    try {
        if (factor === null || factor === "" || factor === undefined || baseDate === null || baseDate === "" || baseDate === undefined) {
            return null;
        } else {
            let momentBaseDate = moment(baseDate)
            let finalDate = momentBaseDate.add(factor, 'days')

            return finalDate;
        }
    } catch (err) {
        console.log("Factor: " + req.body + " baseDate " + baseDate);
        console.log("Titulo read error " + err.name + " - " + err.message);
        return null
    }
}

/***
 * Checks if only numbers are present
 * @param data
 * @param size
 * @returns {boolean}
 */
function isNumeric(data, size) {
    try {
        let myRegex = "[\\d]{" + size.toString() + "}";
        let re = new RegExp(myRegex, "gmi");
        return re.test(data);
    } catch (err) {
        console.log("Request: " + req.body);
        console.log("Titulo read error " + err.name + " - " + err.message);
        return false
    }
}

/***
 * Calculates the general dv and returns the barcode
 * @param bankCode
 * @param currencyCode
 * @param dueFactor
 * @param amount
 * @param filling
 * @returns {string|null}
 */
const barcodeBuilder = (bankCode, currencyCode, dueFactor, amount, filling) => {
    try {
        let dv = helper.moduloOnze(bankCode.toString() + currencyCode.toString() + dueFactor.toString() + amount.toString() + filling.toString())
        let barcode = bankCode.toString() + currencyCode.toString() + dv + dueFactor.toString() + amount.toString() + filling.toString()
        return barcode
    } catch (err) {
        console.log("bankCode: " + bankCode + " currencyCode: " + currencyCode + " dueFactor: " + dueFactor + " amount: " + amount + " filling: " + filling)
        console.log("Barcodebuilder error " + err.name + " - " + err.message);
        return null
    }
}


/***
 * Checks if code is a valid bank code
 * @param code
 * @param bankArray
 * @returns {boolean}
 */
function isABank(code, bankArray) {
    try {
        return !!bankArray.includes(code);
    } catch (err) {
        console.log("Titulo isABank error " + err.name + " - " + err.message);
        return false
    }
}

/***
 * Checks if currency code is valid
 * @param currency
 * @param currenciesArray
 * @returns {boolean}
 */
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
}

/***
 * Validates typed data and returns amount, due date and barcode
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function read(req, res, next) {
    try {
        if (req.slipType !== config().tituloSlipType) {
            next()
        } else {
            if (req.slipType !== config().tituloSlipType) {
                return res.status(config().httpInvalidInput).send({
                    validData: false,
                    amount: 0,
                    dueDate: null,
                    barcode: null,
                    message: config().wrongTypeMsg
                })
            } else {

                let bankCode = req.body.typedData.substring(0, 3)
                let currencyCode = req.body.typedData.substring(3, 4)
                let field1 = req.body.typedData.substring(0, 9)
                let field1Dv = req.body.typedData.substring(9, 10)
                let field2 = req.body.typedData.substring(10, 20)
                let field2Dv = req.body.typedData.substring(20, 21)
                let field3 = req.body.typedData.substring(21, 31)
                let field3Dv = req.body.typedData.substring(31, 32)
                let dueFactor = req.body.typedData.substring(33, 37)
                let stringAmount = req.body.typedData.substring(37, 47)
                let amount = 1 * req.body.typedData.substring(37, 45) + 0.01 * req.body.typedData.substring(45, 47)
                let filler = field1.substring(4,9) + field2 + field3
                let dueDate = null
                let barcode = "00000000000000000000000000000000000000000000"
                //Check Bank Code

                if (!isABank(bankCode, brazilianBanks)) {
                    return res.status(config().httpInvalidInput).send({
                        validData: false,
                        amount: 0,
                        dueDate: null,
                        barcode: null,
                        message: config().invalidBankMsg
                    })
                }

                //Check if no char after first position
                if (!isNumeric(req.body.typedData.substring(1, 47), config().tituloLength - 1)) {
                    return res.status(config().httpInvalidInput).send({
                        validData: false,
                        amount: 0,
                        dueDate: null,
                        barcode: null,
                        message: config().invalidDataMsg
                    })
                }

                //Check currency code

                if (!isValidCurrency(currencyCode, currencies)) {
                    return res.status(config().httpInvalidInput).send({
                        validData: false,
                        amount: 0,
                        dueDate: null,
                        barcode: null,
                        message: config().invalidCurrencyMsg
                    })
                }

                //Check field1 DV
                if (field1Dv != helper.moduloDez(field1)) {
                    return res.status(config().httpInvalidInput).send({
                        validData: false,
                        amount: 0,
                        dueDate: null,
                        barcode: null,
                        message: config().invalidField1Msg
                    })
                }
                //Check field2 DV
                if (field2Dv != helper.moduloDez(field2)) {
                    return res.status(config().httpInvalidInput).send({
                        validData: false,
                        amount: 0,
                        dueDate: null,
                        barcode: null,
                        message: config().invalidField2Msg
                    })
                }

                //Check field3 DV
                if (field3Dv != helper.moduloDez(field3)) {
                    return res.status(config().httpInvalidInput).send({
                        validData: false,
                        amount: 0,
                        dueDate: null,
                        barcode: null,
                        message: config().invalidField3Msg
                    })
                }

                // Get dueDate
                if (dueFactor !== "0000") {
                    dueDate = moment(getDueDate(parseInt(dueFactor), new Date(config().tituloBaseDate))).format("DD/MM/YYYY")
                }


                //get barcode
                barcode = barcodeBuilder(bankCode,currencyCode,dueFactor,stringAmount,filler)


                return res.status(config().httpOk).send({
                    validData: true,
                    amount: amount,
                    dueDate: dueDate,
                    barcode: barcode,
                    message: config().tituloOkMsg
                })
            }
        }
    } catch (err) {
        console.log("Request: " + req.body);
        console.log("Titulo read error " + err.name + " - " + err.message);
        return res.status(config().httpServerError).send({
            validData: false,
            amount: 0,
            dueDate: null,
            barcode: null,
            message: config().couldNotReadTituloMsg
        })
    }
}