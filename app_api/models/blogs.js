var mongoose = require('mongoose');
const Schema = mongoose.Schema; //lab8

const blogSchema = new Schema({ //lab8
      blog_title: { type: String, trim: true, default: '' },
      blog_text: { type: String, trim: true, default: '' },
      created_On: { type: Date, default: Date.now },
      blog_author: { type: String, trim: true, default: '' },  //lab7
      blog_email: { type: String, trim: true, default: '' },  //lab7
      blog_count: {type: Number, trim: true, min: 0}//lab8  
      //reviews: [reviewSchema]//lab8        
});
// Reviews are arrays of subdocuments
/*const reviewSchema = new Schema({
      author: { type: String, trim: true, default: '' },
      rating: {type: Number, trim: true, min: 0, max:5},
      reviewText: {type: String, trim: true, default: ''},
      createdOn: {type: Date, default: Date.now}
    });
*/
// mongoose.model('blogSchema', 'reviewSchema');  
//blogSchema.index({coords: '2dsphere'}) I defined as 'Blogs';
mongoose.model('Blog', blogSchema);


