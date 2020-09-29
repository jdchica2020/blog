/* GET homepage */ 
const home = (req, res, next) => { 
    res.render('home', { title: 'Joan Chica' });
};
module.exports = { 
  home
};
