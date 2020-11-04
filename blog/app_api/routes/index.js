const express = require('express');
const router = express.Router();
var jwt = require('express-jwt'); // I added this additional because secretworrd
var auth = jwt({   // Lab 6
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});
const ctrlBlogs = require('../controllers/blog');
var ctrlAuth = require('../controllers/authentication');  // Lab 6


/* Setting up routes */
router 
	.route('/blogs')
	.get(ctrlBlogs.returnListOfBlogs) 
	.post(auth, ctrlBlogs.addBlog)// lab6 added auth param


router
	.route('/blogs/:blogid') 
	.get(ctrlBlogs.returnSingleBlog)
	.put(auth, ctrlBlogs.updateBlog) // lab6 added auth param
	.delete(auth, ctrlBlogs.deleteBlog) // lab6 added auth param


router
	.post('/register', ctrlAuth.register)  // Lab 6
	.post('/login', ctrlAuth.login)  // Lab 6


module.exports = router;
