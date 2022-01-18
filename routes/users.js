var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
/* GET users listing. */

router.get('/:id/verify',userController.verifyUser)
router.get('/', userController.list);
router.get('/:id/notes',userController.getListNote)
router.post('/', userController.addUser)
router.post('/:id/notes',userController.addNote)
router.patch('/',userController.changePassword)

module.exports = router;
