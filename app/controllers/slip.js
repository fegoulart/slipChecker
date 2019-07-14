'use strict';

let config = require('../config'); // get our config file

module.exports = {
    verify: verify
};


function validateEmail(email) {
    var re = /[^\s@]+@[^\s@]+\.[^\s@]+/i;
    return re.test(email);
}

//DD/MM/YYYY
function validateDate(dt_nascimento) {
    var re = /([0-2][0-9]|[3][0-1])\/([1][0-2]|[0][1-9])\/(19|20)[0-9][0-9]$/;
    return re.test(dt_nascimento);
}

// titulo NET
// 84630000003-7 98930296201-8 90710003000-2 00356248299-6

// boleto despacon
//03399.21199 68400.000029 35050.501010 7 79440000047400 --57 numeros

function verify(req, res, next) {

    try {

        if (req.body.typedData === null || req.body.typedData === "") {
            return res.status(config().httpInvalidInput).send({
                validData: false,
                amount: 0,
                dueDate: null,
                barcode: null,
                message: config.noDataInformedMsg
            })
        }

        req.body.typedData = req.body.typedData.replace(/[^\d\w]/gmi, '');
        if (req.body.typedData.length == config().boletoLength) {
            req.slipType = config().boletoSlipType
        } else {
            if (req.body.typedData.length == config().tituloLength) {
                req.slipType = config().tituloSlipType
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
        console.log("Request: " + req.body)
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