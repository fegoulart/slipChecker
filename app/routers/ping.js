'use strict';

let Router=require('express').Router;
let router = new Router();
let controllers = require('../controllers/index');
let bodyParser = require('body-parser');
let multer = require('multer')({dest: './uploads'});

//accept urlencode, json e multipart
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
router.use(multer.array());

router
    .route('')
    .get(controllers.ping.get);

module.exports=router;