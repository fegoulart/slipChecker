'use strict';

let moment = require('moment');
let config = require('../config'); // get our config file
let helper = require('./helper');

module.exports = {
    read: read
};


const validSegments = ["1", "2", "3", "4", "5", "6", "7", "9"]
const validRealValues = ["6", "7", "8", "9"]


/***
 * Checks if string is a date in format YYYYMMDD
 * @param data
 * @returns {null|boolean}
 */
function isDate(data) {
    try {
        let re = /^(19[0-9][0-9]|20[0-9][0-9])([1][0-2]|[0][1-9])([0-2][0-9]|[3][0-1])$/;
        return re.test(data);
    } catch (err) {
        console.log("data: " + data);
        console.log("isDate error " + err.name + " - " + err.message);
        return null
    }
}

/***
 * Converts string to Moment Date
 * @param stringDueDate
 * @returns {moment.Moment|null}
 */
function getDueDate(stringDueDate) {
    try {
        let myDate = new Date(stringDueDate.substring(4, 6) + "/" + stringDueDate.substring(6, 8) + "/" + stringDueDate.substring(0, 4))
        return moment(myDate)

    } catch (err) {
        console.log("stringDueDate: " + stringDueDate);
        console.log("getDueDate error " + err.name + " - " + err.message);
        return null
    }

}

/***
 * Check if typed data has only numbers
 * @param data
 * @param size
 * @returns {boolean}
 */
function isNumeric(data, size) {
    let myRegex = "[\\d]{" + size.toString() + "}";
    let re = new RegExp(myRegex, "gmi");
    return re.test(data);
}

/***
 * Checks if typed data is valid and returns amount, dueDate and barcode
 * @param req
 * @param res
 * @returns {*}
 */
function read(req, res) {
    try {

        if (!isNumeric(req.body.typedData, config().convenioLength)) {
            return res.status(config().httpInvalidInput).send({
                validData: false,
                amount: 0,
                dueDate: null,
                barcode: null,
                message: config().invalidDataMsg
            })
        }

        let field1 = req.body.typedData.substring(0, 11)
        let dvField1 = req.body.typedData.substring(11, 12)
        let field2 = req.body.typedData.substring(12, 23)
        let dvField2 = req.body.typedData.substring(23, 24)
        let field3 = req.body.typedData.substring(24, 35)
        let dvField3 = req.body.typedData.substring(35, 36)
        let field4 = req.body.typedData.substring(36, 47)
        let dvField4 = req.body.typedData.substring(47, 48)
        let barcode = field1 + field2 + field3 + field4
        let product = barcode.substring(0, 1)
        let segment = barcode.substring(1, 2)
        let realValue = barcode.substring(2, 3)
        let generalDv = barcode.substring(3, 4)
        let stringAmount = barcode.substring(4, 15)
        let companyId = barcode.substring(15, 19)
        let cnpj = barcode.substring(15, 23)
        let stringDueDate = barcode.substring(19, 27)
        let dueDate = null

        let amount = 0.00

        //Product check
        if (product != "8") {
            return res.status(config().httpInvalidInput).send({
                validData: false,
                amount: 0,
                dueDate: null,
                barcode: null,
                message: config().invalidProductMsg
            })
        }

        //Segment check
        if (!validSegments.includes(segment)) {
            return res.status(config().httpInvalidInput).send({
                validData: false,
                amount: 0,
                dueDate: null,
                barcode: null,
                message: config().invalidSegmentMsg
            })
        }

        //Check real Value
        if (!validRealValues.includes(realValue)) {
            return res.status(config().httpInvalidInput).send({
                validData: false,
                amount: 0,
                dueDate: null,
                barcode: null,
                message: config().invalidRealValueMsg
            })
        }

        //Field 1 Check
        if (dvField1 != helper.moduloDez(field1)) {
            return res.status(config().httpInvalidInput).send({
                validData: false,
                amount: 0,
                dueDate: null,
                barcode: null,
                message: config().invalidField1Msg
            })
        }

        //Field 2 Check
        if (dvField2 != helper.moduloDez(field2)) {
            return res.status(config().httpInvalidInput).send({
                validData: false,
                amount: 0,
                dueDate: null,
                barcode: null,
                message: config().invalidField2Msg
            })
        }

        //Field 3 Check
        if (dvField3 != helper.moduloDez(field3)) {
            return res.status(config().httpInvalidInput).send({
                validData: false,
                amount: 0,
                dueDate: null,
                barcode: null,
                message: config().invalidField3Msg
            })
        }

        //Field 4 Check
        if (dvField4 != helper.moduloDez(field4)) {
            return res.status(config().httpInvalidInput).send({
                validData: false,
                amount: 0,
                dueDate: null,
                barcode: null,
                message: config().invalidField4Msg
            })
        }

        //General DV Check
        if (realValue == "6" || realValue == "7") {
            if (barcode.substring(3, 4) != helper.moduloDez(barcode.substring(0, 3) + barcode.substring(4))) {
                return res.status(config().httpInvalidInput).send({
                    validData: false,
                    amount: 0,
                    dueDate: null,
                    barcode: null,
                    message: config().invalidField1Msg
                })
            }
        } else {
            if (barcode.substring(3, 4) != helper.moduloOnze(barcode.substring(0, 3) + barcode.substring(4))) {
                return res.status(config().httpInvalidInput).send({
                    validData: false,
                    amount: 0,
                    dueDate: null,
                    barcode: null,
                    message: config().invalidField1Msg
                })
            }
        }

        //Get amount
        if (realValue == "6" || realValue == "8") {
            amount = 1 * stringAmount.substring(0, 9) + 0.01 * stringAmount.substring(9, 11)
        }

        //Get dueDate
        if (isDate(stringDueDate)) {
            dueDate = getDueDate(stringDueDate).format("DD/MM/YYYY")
        }

        return res.status(config().httpOk).send({
            validData: true,
            amount: amount,
            dueDate: dueDate,
            barcode: barcode,
            message: config().convenioOkMsg
        })

    } catch
        (err) {
        console.log("Request: " + req.body);
        console.log("Slip verify error " + err.name + " - " + err.message);
        return res.status(config().httpServerError).send({
            validData: false,
            amount: 0,
            dueDate: null,
            barcode: null,
            message: config().couldNotReadConvenioMsg
        })
    }
}

