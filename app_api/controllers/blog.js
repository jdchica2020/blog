const mongoose = require('mongoose');
const Blog = mongoose.model('Blog');


const returnListOfBlogs = (req, res) => {
  Blog
	.find()
	.exec((err, blog) => {
	if(!blog){
	  return res 
   	.status(404)
		.json({
		    "message": "no Blogs found"
       });
   }else if(err){
      return res
		  .status(404)
		  .json(err);
   	}
    res
     
		.status(200) 
		.json(blog);
        });
   };



//add a blog
const addBlog = (req, res) => {
	Blog.create({
	blog_title: req.body.blog_title,
	blog_text:  req.body.blog_text,
	blog_author: req.body.blog_author,//lab7 payload
	blog_email: req.body.blog_email,//lab7
    created_On: req.body.created_On
    	},(err, blog) => {
    	if (err){
	   res
		.status(400)
		.json(err);
       } else{
           res
		.status(201)
		.json(blog);
            }
       }); 
};
    



// return a single blog given an id
const returnSingleBlog = (req, res) => {
	Blog 
    .findById(req.params.blogid)
	  .exec((err, blog) => {
	  if(!blog){
		
	    return res
		.status(404)
		.json({
	            "message": "blog not found"
	    });
	    } else if (err){
    	       return res
		.status(404)
		.json(err);
            }
     	    res
		.status(200)
		.json(blog);
    	    });
};



// update blog
const updateBlog = (req, res) => { Blog 
    .findById(req.params.blogid)
    .exec((err, blog) => { 
    	blog.blog_title = req.body.blog_title;
		  blog.blog_text = req.body.blog_text;
     	blog.created_On = req.body.created_On;
      blog.save((err, blog) => {
	if(err){
	res
			.status(404) 
    		.json(err);
        } else {
        res
			.status(200)
			.json(blog);
    	}
	});
   }); 
};



    
// delete a blog 

const deleteBlog = (req, res) => {
    const {blogid} = req.params; 
   	if(blogid){
	 Blog
		.findByIdAndRemove(blogid)
		.exec((err, blog) => {
	if(err) {
	  return res
		.status(404)
		.json(err);
        }
        res
		.status(204)
		.json(null);
    	});
       }else {
       res
		.status(404)
		.json({ "message": " no blog found"
    });
   }
};


//list of the rates

const rateBlog = (req, res) => {
  Blog
	.find()
	.exec((err, blog) => {
	if(!blog){
	  return res 
   	.status(404)
		.json({
		    "message": "no Blogs found"
       });
   }else if(err){
      return res
		  .status(404)
		  .json(err);
   	}
    res
     
		.status(200) 
		.json(blog);
        });
   };






module.exports = {
	returnListOfBlogs,
	addBlog,
	returnSingleBlog, 
	updateBlog,
	deleteBlog,
	rateBlog
		
};  
