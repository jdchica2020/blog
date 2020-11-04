var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({ 
      blog_title: { type: String, trim: true, default: '' },
      blog_text: { type: String, trim: true, default: '' },
      created_On: { type: Date, default: Date.now }
     
});


mongoose.model('Blog', blogSchema);


