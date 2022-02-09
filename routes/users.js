var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
var auth = require('../controllers/authController')
/* GET users listing. */

router.get('/:id/verify',userController.verifyUser)
router.get('/', userController.list);
router.get('/:id/notes',userController.getListNote)
router.post('/', userController.addUser)
router.post('/:id/notes',userController.addNote)
router.patch('/',userController.changePassword)
router.get('/login',function(req,res,next){
    res.render('login')
})
router.post('/login',auth.login)
router.get('/register',function(req,res,next){
    res.render('register')
})
router.post('/register',auth.register)
module.exports = router;
