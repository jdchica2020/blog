/* GET blogList  
const blgList = (req, res, next) => { 
res.render('blogList', { title: 'Blog List' });
};
/* GET blogAdd
const blgAdd = (req, res, next) => { 
 res.render('blogAdd', { title: 'Add Blog' });
};
module.exports = { 
 blgList, 
 blgAdd,
 blgEdit,
 blgDelete
};*/


/*module.exports.blgAdd = function(req, res){ 
        res.render('blog-add', {title: 'Blog Add'}) 
};*/


module.exports.blgList = function(req, res){ 
        res.render('blogList', { title:'Blog List',
	blogEntries: [{ 
                blog_title: 'Blog1', 
                blog_text: 'First post',
                createOn: '9-27-2020'
        },


        {
			
		blog_title: 'Blog2',
                blog_text: 'Second Post',
                createOn:'9-27-2020'

         },
         {

                blog_title: 'Blog3',
                blog_text: 'Third Post',
                createOn: '9-27-2020'
       
         }
         ]
         });
};



module.exports.blgAdd = function(req, res){ 
    res.render('blogAdd', {title: 'Blog Add'})
};

module.exports.blgEdit = function(req, res){ 
        res.render('blogEdit', {title: 'Edit Blog'});
};

module.exports.blgDelete = function(req, res){ 
        res.render('blogDelete', {title: 'Delete Blog'});
};

