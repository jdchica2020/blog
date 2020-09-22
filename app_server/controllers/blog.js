/* GET blogList */ 
const blgList = (req, res, next) => { 
res.render('blogList', { title: 'Blog List' });
};
/* GET blogAdd*/
const blgAdd = (req, res, next) => { 
 res.render('blogAdd', { title: 'Add Blog' });
};
module.exports = { 
 blgList, 
 blgAdd
};
