var express = require('express');
var router = express.Router();
var authenticate = require('../controllers/authController')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});
router.get('/login',function(req,res,next){
  res.render('login')
})
router.get('/home',authenticate.verifyToken,function(req,res,next){
  res.render('home')
})
router.get('/logout',authenticate.verifyToken,authenticate.logout)
module.exports = router;
