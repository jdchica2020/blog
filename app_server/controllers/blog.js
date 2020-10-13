
const request = require('request');
const apiOptions = {
       server: 'http://localhost:80'
};
if (process.env.NODE_ENV === 'production') {
        apiOptions.server = 'https://pure-temple-67771.herokuapp.com';
}



 /* error control*********************************************/

const showError = (req, res, status) => {
        let title = '';
        let content = '';
      
        if (status === 404) {
          title = '404, page not found';
          content = 'Oh dear, Looks like we can\'t find this page. Sorry';
        } else {
          title = `${status}, something's gone wrong`;
          content = 'Something, somewhere, has gone just a little bit wrong.';
        }
        res.status(status);
        res.render('generic-text', {
          title,
          content
        });
      };




 /* return  blogList******************************************/

const renderBlgList = (req, res, responseBody) => {
        let message = null;
        if (!(responseBody instanceof Array)) {
          message = 'API lookup error';
          responseBody = [];
        } else {
          if (!responseBody.length) {
            message = 'No blogs were founded';
          }
        }
        res.render('blogList',{title: 'Blog List', blogs: responseBody, message: message
        });
};

     
const blgList = (req, res) => {
        const path = '/api/blogs';
        const requestOptions = {
          url: `${apiOptions.server}${path}`,
          method: 'GET',
          json: {}
        };
        request(
          requestOptions,
          (err, {statusCode}, body) => {
            let data = [];
            if (statusCode === 200 && body.length) {
              data = body
          } else{
              showError(req, res, statusCode);
          }
          renderBlgList(req, res, data);
          }
      );
};    


 /*  add Entries******************************/
 const blgAdd = (req, res) => {
        res.render('blogAdd', {title: 'Blog Add'})
    };
    
    const blgEntries = (req, res) => {
        const path = `/api/blogs`;
        const postdata = {
          blog_title: req.body.blog_title,
          blog_text:  req.body.blog_text,
          createdOn:  req.body.createdOn
        };
        const requestOptions = {
          url: `${apiOptions.server}${path}`,
          method: 'POST',
          json: postdata
        };
        request(
            requestOptions,
            (err, {statusCode}, body) => {
              if (statusCode === 201) {
                res.redirect('/blogList');
              } else {
                showError(req, res, statusCode);
                     }
              }
        );
    };
    
    
/* return  edit *******************************************/

const  renderblgEdit = function(req, res, data){
        res.render('blogEdit', {title: 'Edit Blog', blog: data});
    };
    
    const blgEdit = (req, res) => {
        const blogid = req.params.blogid;
        const path = `/api/blogs/${blogid}`;
        const requestOptions = {
          url: `${apiOptions.server}${path}`,
          method: 'GET',
          json: {}
        }
        request(
            requestOptions, (err, response, body) => {
            const data = body;
                  renderblgEdit(req, res, data);
              }
        );
    };

const updateBlogEntry = (req, res) => {
        const blogid = req.params.blogid;
        const path = `/api/blogs/${blogid}`;
        const updatedData = {
            blog_title: req.body.blog_title,
            blog_text: req.body.blog_text
   
        };
        const requestOptions = {
            url: `${apiOptions.server}${path}`,
            method: 'PUT',
            json: updatedData
        };
        request(
            requestOptions,
            (err, { statusCode }, body) => {
                if (statusCode === 200) {
                    res.redirect('/blogList');
                } else {
                    showError(req, res, statusCode);
                }
            }
        );
};
    









const renderBlgDelete = function(req, res, data){
        res.render('blogDelete', {title: 'Delete Blog', blog: data}
        );
    };
    
    
    /* Blog Delete */
const blgDelete = (req, res) => {
        const blogid = req.params.blogid;
        const path =  `/api/blogs/${blogid}`;
        const requestOptions = {
            url : `${apiOptions.server}${path}`,
            method : 'GET',
            json : {}
        };
        request(
            requestOptions, (err, response, body) => {
               const data = body;     
               renderBlgDelete(req, res, data);
            }
        );
    };



 /* Blog Delete  Entries "POST"*/
const  blgDeleteEntries = (req, res) => {
        const blogid = req.params.blogid;
        const path =  `/api/blogs/${blogid}`;
        const requestOptions = {
                url : `${apiOptions.server}${path}`,
                method : 'DELETE',
                json : {}
        };
    
        request(
                requestOptions, (err, {statusCode}, body) => {
            if (statusCode === 204) {
                res.redirect('/bloglist');
            } else {
                showError(req, res, statusCode);
            }
        }
    );
    };     
/* delete**************************************************/
/* Render the blook delete page */

  
/* blgEntries = addblgEntries********************************/



module.exports = {
        blgList,
        blgAdd, 
        blgEntries,
        blgEdit,
        blgDelete,
        blgDeleteEntries,
        updateBlogEntry

        
};


