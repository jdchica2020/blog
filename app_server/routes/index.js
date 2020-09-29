var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlBlog = require('../controllers/blog');


router.get('/', ctrlHome.home);
router.get('/blogList', ctrlBlog.blgList);
router.get('/blogAdd', ctrlBlog.blgAdd);
router.get('/blogEdit', ctrlBlog.blgEdit);
router.get('/blogDelete', ctrlBlog.blgDelete);


module.exports = router;
