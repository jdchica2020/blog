var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({ 
      blog_title: String, 
      blog_text:  String, 
      created_On: { 
            type: Date, 
            "default": Date.now
     }
});


mongoose.model('Posts', blogSchema);


