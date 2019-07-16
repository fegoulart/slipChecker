'use strict';

let config = require('../config'); // get our config file

module.exports = {
    get: get
};

/***
 * Returns a simple message "All good. Go back to bed."
 * @param req
 * @param res
 * @returns {*}
 */
function get(req, res) {
    try {
        res.status(config().httpOk)
            .json({message: 'All good. Go back to bed.'});
    } catch (err) {
        console.log("Request: " + req.body);
        console.log("Slip verify error " + err.name + " - " + err.message);
        return res.status(config().httpServerError).send({
            validData: false,
            amount: 0,
            dueDate: null,
            barcode: null,
            message: config().couldNotPingMsg
        })
    }
}

