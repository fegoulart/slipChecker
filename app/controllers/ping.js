'use strict';

module.exports = {
    get: get
};

function get(req, res) {
    res.status(200)
        .json({message: 'All good. Go back to bed.'});
}

/*

 */