const express = require('express');
const router = express.Router();
const ctrlHome = require('../controllers/home');
const ctrlBlog = require('../controllers/blog');


router.get('/', ctrlHome.home);
router.get('/blogList', ctrlBlog.blgList);
router.get('/blogAdd', ctrlBlog.blgAdd);


module.exports = router;
