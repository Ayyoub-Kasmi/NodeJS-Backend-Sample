const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();


router.get('/signup', authController.signup_get); //get the form page

router.post('/signup', authController.createUser); //1
router.get('/all', authController.getAllUsers); //2
router.post('/login', authController.getUser); //3
router.put('/signup', authController.updateUser); //4
router.delete('/signup', authController.deleteUser); //5


module.exports = router;