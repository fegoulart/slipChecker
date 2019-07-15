'use strict';

let moment = require('moment');

let config = require('../config'); // get our config file

let brazilianBanks = ["654", "246", "025", "641", "213", "019", "029", "000", "740", "107", "031", "739", "096", "318", "752", "248", "218", "065", "036", "204", "394", "237", "225", "M15", "208", "044", "263", "473", "412", "040", "745", "M08", "241", "M19", "215", "756", "748", "075", "721", "222", "505", "229", "266", "003", "083", "M21", "707", "300", "495", "494", "M06", "024", "456", "214", "001", "047", "037", "039", "041", "004", "265", "M03", "224", "626", "M18", "233", "734", "M07", "612", "M22", "063", "M11", "604", "320", "653", "630", "077", "249", "M09", "184", "479", "376", "074", "217", "076", "757", "600", "212", "M12", "389", "746", "M10", "738", "066", "243", "045", "M17", "623", "611", "613", "094", "643", "724", "735", "638", "M24", "747", "088", "356", "633", "741", "M16", "072", "453", "422", "033", "250", "743", "749", "366", "637", "012", "464", "082", "M20", "M13", "634", "M14", "M23", "655", "610", "370", "021", "719", "755", "744", "073", "078", "069", "070", "092", "104", "477", "081", "097", "085", "099", "090", "089", "087", "098", "487", "751", "064", "062", "399", "168", "492", "652", "341", "079", "488", "014", "753", "086", "254", "409", "230", "091", "084"];
//TODO: Check what is modulo 10 for letters (eg Banco Volkwagen)
let currencies = ["9"]

module.exports = {
    read: read
};

/***
 *
 * @param factor
 * @param baseDateMil
 * @returns {null}
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
 *
 * @param data
 * @param size
 * @returns {boolean}
 */
function isNumeric(data, size) {
    //let re = /^([19|20][0-9][0-9])([1][0-2]|[0][1-9])([0-2][0-9]|[3][0-1])$/;
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
 *
 * @param codigo
 * @returns {string|null}
 */
function moduloDez(codigo) {
    try {
        let mult = 2;
        let sum = 0;
        let dv = 0;

        for (let i = codigo.length - 1; i >= 0; i--) {

            let digit = parseInt(codigo.charAt(i), 10);
            let product = 0;

            if (isNaN(digit)) {
                digit = 0
            }

            product = digit * mult;
            if (product >= 10) {
                product = product - 9
            }

            sum += product

            if (mult == 2) {
                mult = 1
            } else {
                mult = 2
            }

        }

        dv = sum % 10;
        if (dv != 0) {
            dv = 10 - dv
        }

        return dv.toString()


    } catch (err) {
        console.log("Codigo: " + codigo);
        console.log("Modulo 10 error " + err.name + " - " + err.message);
        return null
    }

}

/***
 *
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
 *
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
                let amount = 1 * req.body.typedData.substring(37, 45) + 0.01 * req.body.typedData.substring(45, 47)
                let dueDate = null

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
                if (field1Dv != moduloDez(field1)) {
                    return res.status(config().httpInvalidInput).send({
                        validData: false,
                        amount: 0,
                        dueDate: null,
                        barcode: null,
                        message: config().invalidField1Msg
                    })
                }
                //Check field2 DV
                if (field2Dv != moduloDez(field2)) {
                    return res.status(config().httpInvalidInput).send({
                        validData: false,
                        amount: 0,
                        dueDate: null,
                        barcode: null,
                        message: config().invalidField2Msg
                    })
                }

                //Check field3 DV
                if (field3Dv != moduloDez(field3)) {
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

                return res.status(config().httpOk).send({
                    validData: true,
                    amount: amount,
                    dueDate: dueDate,
                    barcode: null,
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