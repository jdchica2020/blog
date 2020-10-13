const express = require('express');
const router = express.Router();
const ctrlBlogs = require('../controllers/blog');


/* Setting up routes */
router 
	.route('/blogs')
	.get(ctrlBlogs.returnListOfBlogs) 
	.post(ctrlBlogs.addBlog)


router
	.route('/blogs/:blogid') 
	.get(ctrlBlogs.returnSingleBlog)
	.put(ctrlBlogs.updateBlog) 
	.delete(ctrlBlogs.deleteBlog)


module.exports = router;
