const express=require('express')
const router=express.Router()
require('../db/conn')
const auth=require('../Middleware/Auth')
const userControl=require('../controllers/userController')
var session = require('express-session');
router.use(session({secret:'Asjad'}));

router.get('/Signup',userControl.SignUp)
router.get('/Signin',userControl.SignIn)
router.get('/Forgot',userControl.ForgotPass)
router.post('/Signup',userControl.UserRegister)
router.post('/Signin',userControl.VerifyLogin)
router.post('/Forgot',userControl.ForgotUser)
router.get('/Profile',userControl.ProfileView)
router.get('/Edit',userControl.EditProfileForm)
router.post('/Edit',userControl.EditProfile)
router.get('/Post',userControl.AddPostForm)
router.post('/Post',userControl.AddPost)
router.get('/AddFriend',userControl.AddFriend)


module.exports=router