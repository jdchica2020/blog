const express = require('express');
const router = express.Router();

const ctrlHome = require('../controllers/home')
const ctrlBlog = require('../controllers/blog');




/* Setting up routes */
router.get('/', ctrlHome.home );
router.get('/blogList', ctrlBlog.blgList);


router 
	.route('/blogAdd')
	.get(ctrlBlog.blgAdd) 
    .post(ctrlBlog.blgEntries);
    

router 
	.route('/blogEdit/:blogid')
    .get(ctrlBlog.blgEdit)
    .post(ctrlBlog.updateBlogEntry);
     
    
router
	.route('/blogDelete/:blogid') 
    .get(ctrlBlog.blgDelete)
    .post(ctrlBlog.blgDeleteEntries); 
	






module.exports = router;
