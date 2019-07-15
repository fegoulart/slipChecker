'use strict';

let config = require('../config'); // get our config file

module.exports = {
    read: read
};

/*
//YYYY/MM/DD
function validateDate(dt_nascimento) {
    let re = /^([19|20][0-9][0-9])([1][0-2]|[0][1-9])([0-2][0-9]|[3][0-1])$/;
    return re.test(dt_nascimento);
}*/

function isNumeric(data, size) {
    //let re = /^([19|20][0-9][0-9])([1][0-2]|[0][1-9])([0-2][0-9]|[3][0-1])$/;
    let myRegex = "[\\d]{" + size.toString() + "}";
    let re = new RegExp(myRegex, "gmi");
    return re.test(data);
}


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
        return res.status(config().httpOk).send({
            validData: true,
            amount: 0,
            dueDate: null,
            barcode: null,
            message: config().convenioOkMsg
        })

    } catch (err) {
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

/*
// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', function (req, res, next) {
    // if the user ID is 0, skip to the next router
    if (req.params.id === '0') next('route')
    // otherwise pass control to the next middleware function in this stack
    else next()
}, function (req, res, next) {
    // render a regular page
    res.render('regular')
})

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', function (req, res, next) {
    console.log(req.params.id)
    res.render('special')
})

 */