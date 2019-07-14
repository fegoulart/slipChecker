'use strict';

module.exports = {
    get: get
};

function get(req, res) {
    res.status(config.httpOk)
        .json({message: 'All good. Go back to bed.'});
}

