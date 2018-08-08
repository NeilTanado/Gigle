var express = require('express');
var router = express.Router();
const Controller = require('../controllers/userController');

router.get('/',(req,res)=>{
  res.send('Welcome To User Router');
});

router.post('/', Controller.createUser)
router.put('/', Controller.updateUser)
router.put('/password', Controller.updatePassword)
router.get('/alluser',Controller.getUser)

module.exports = router;
