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
    .route('/')
    .post(controllers.slip.verify) // Verifies if typedData is good
    .post(controllers.titulo.read) // If it is a convenio will skip using .next('route')
    .post(controllers.convenio.read);





module.exports=router;