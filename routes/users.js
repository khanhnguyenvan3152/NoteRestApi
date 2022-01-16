var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
/* GET users listing. */

router.get('/:id/verify',userController.verifyUser)
router.get('/', userController.list);

router.post('/', userController.addUser)

module.exports = router;
