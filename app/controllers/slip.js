'use strict';

let config = require('../config'); // get our config file

module.exports = {
    verify: verify
};


/***
 * Checks is typed data is a titulo, a convenio or invalid. It will route accordingly.
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function verify(req, res, next) {

    try {

        if (req.body.typedData === null || req.body.typedData === "" || req.body.typedData === undefined) {
            return res.status(config().httpInvalidInput).send({
                validData: false,
                amount: 0,
                dueDate: null,
                barcode: null,
                message: config().noDataInformedMsg
            })
        }

        req.body.typedData = req.body.typedData.replace(/[^\d\w]/gmi, '');
        if (req.body.typedData.length === config().tituloLength) {
            req.slipType = config().tituloSlipType;
            next()
        } else {
            if (req.body.typedData.length === config().convenioLength) {
                req.slipType = config().convenioSlipType;
                next()
            } else {
                return res.status(config().httpInvalidInput).send({
                    validData: false,
                    amount: 0,
                    dueDate: null,
                    barcode: null,
                    message: config().invalidDataMsg
                })
            }
        }


    } catch (err) {
        console.log("Request: " + req.body);
        console.log("Slip verify error " + err.name + " - " + err.message);
        return res.status(config().httpServerError).send({
            validData: false,
            amount: 0,
            dueDate: null,
            barcode: null,
            message: config().couldNotVerifyMsg
        })
    }


}