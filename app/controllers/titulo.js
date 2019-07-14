'use strict';

module.exports = {
    read: read
};

/*
function getDueDate(factor, baseDateMil) {

    if (factor === null || factor === "" || factor === undefined || baseDateMil === null || baseDateMil === "" || baseDateMil === undefined) {
        return null;
    } else {
        return null;
    }

}*/

function read(req, res) {
    if (req.slipType !== config.tituloSlipType) {
        return res.status(config.httpInvalidInput).send({
            validData: false,
            amount: 0,
            dueDate: null,
            barcode: null,
            message: config.wrongTypeMsg
        })
    } else {
        return res.status(config.httpOk).send({
            validData: true,
            amount: 0,
            dueDate: null,
            barcode: null,
            message: config.tituloOkMsg
        })
    }

}