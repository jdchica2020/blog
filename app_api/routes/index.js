const express = require('express');
const router = express.Router();
var jwt = require('express-jwt'); // I added this additional because secretworrd
var auth = jwt({   // Lab 6
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});
const ctrlBlogs = require('../controllers/blog');
//const ctrlReviews = require('../controllers/reviews');//lab8
var ctrlAuth = require('../controllers/authentication');  // Lab 6


/* Setting up routes */
router 
	.route('/blogs')
	.get(ctrlBlogs.returnListOfBlogs) 
	.post(auth, ctrlBlogs.addBlog)// lab6 added auth param
	.get(auth, ctrlBlogs.rateBlog) //lab8



router
	.route('/blogs/:blogid') 
	.get(ctrlBlogs.returnSingleBlog)
	.put(auth, ctrlBlogs.updateBlog) // lab6 added auth param
	.delete(auth, ctrlBlogs.deleteBlog) // lab6 added auth param


router
	.post('/register', ctrlAuth.register)  // Lab 6
	.post('/login', ctrlAuth.login)  // Lab 6


// reviews
//router
//  .route('/blogs/:blogid/reviews')
//  .post(ctrlBlogs.reviewBlog);//Lab8
  //.post(ctrlBlogs.doAddReview);
	
/*.router	
	.route('/blogs/:blogid/reviews/:reviewid') // Lab8
	.get(ctrlReviews.reviewsReadOne)  //lab8
    .put(ctrlReviews.reviewsUpdateOne)  //lab8		
	.delete(ctrlReviews.reviewsDeleteOne)  //lab8
	*/


module.exports = router;
