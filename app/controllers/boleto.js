'use strict';

module.exports = {
    read: read
};


function read(req, res, next) {
    if (req.slipType !== config.boletoSlipType) {
        next('route')
    } else {
        return res.status(config.httpOk).send({
            validData: true,
            amount: 0,
            dueDate: null,
            barcode: null,
            message: config.boletoOkMsg
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