const Data=require('../Model/Schema')
const bcrypt=require('bcrypt')
const nodemailer=require('nodemailer')
const path=require('path')
const upload =require('../Middleware/upload').single('Img')
const Upload =require('../Middleware/upload').single('image')

const SignUp=async(req,res)=>{
    try {
        res.sendFile(path.join(__dirname,'../views/signup.html'))
    } catch (error) {
        console.log(error.message)
    }
}

const SignIn=async(req,res)=>{
    try {
        res.sendFile(path.join(__dirname,'../views/login.html'))
    } catch (error) {
        console.log(error.message)
    }
}

const ForgotPass=async(req,res)=>{
    try {
        res.sendFile(path.join(__dirname,'../views/ForgotPass.html'))
    } catch (error) {
        console.log(error.message)
    }
}



const UserRegister=async(req,res,next)=>{
    try {
        upload(req, res, async (err) => {
            if (err) {
              console.log(err);
            } 
            else {
        const Fname=req.body.Fname
            const Lname=req.body.Lname
            const Email=req.body.Email
            const About=req.body.About
            const Place=req.body.Place
            const Website=req.body.Website
            const Password=req.body.Password
            const Img=req.file.filename

            console.log(Img)
        console.log(req)
               
                const ADD=new Data({Fname,Lname,Email,About,Place,Website,Password,Img})
                await ADD.save()
                res.status(200).send('Data Stored sucessfully')
            } })
    } catch (error) {
        console.log(error.message)
    }
    }



const VerifyLogin=async(req,res,next)=>{
try {
    upload(req, res, async (err) => {
        if (err) {
          console.log(err);
        } 
        else {
    const email=req.body.Email
    const password=req.body.Password

    const login=await Data.findOne({Email:email,Password:password})
    console.log(login)
    if(login){
    //  return res.status(200).json(login)
    req.session.user_id = login._id;
     return res.status(200).redirect('/Profile')
    }else{
        res.status(404).send('Login Failed error occured')
    }
    next(login)
} })
} catch (error) {
    console.log(error.message)
}
}

const ForgotUser=async(req,res,next)=>{
    try {
        upload(req, res, async (err) => {
            if (err) {
              console.log(err);
            } 
            else {
        const email=req.body.Email
            const password=req.body.Password
            const PassChange=await Data.findOneAndUpdate({Email:email},{Password:password})
            if(PassChange){
                res.status(200).json({message:'Password Sucessulyy Changed'})
            }else{
                res.status(404).send('Unable to Change your Password')
            }
        } })
    } catch (error) {
        console.log(error.message)
    }
    }

    const ProfileView=async(req,res,next)=>{
        try {
            upload(req, res, async (err) => {
                if (err) {
                  console.log(err);
                } 
                else {
        const userData=await Data.findById({_id:req.session.user_id})
           res.render('../views/profile',{user:userData})
        } })
        //    res.sendFile(path.join(__dirname,'../views/profile.html'),{user:userData})
        } catch (error) {
            console.log(error.message)
        }
        }

        const EditProfileForm=async(req,res)=>{
            try {
                const id=req.query.id
                const EditProfile=await Data.findById({_id:id})
                if(EditProfile){
                    res.render('../views/edit',{user:EditProfile})
                    // res.sendFile(path.join(__dirname,'../views/edit.html'))
                }
                else{
                    res.json({message:'id not found'})
                }
            } catch (error) {
                console.log(error.message)
            }
        }

        const EditProfile=async(req,res)=>{
            try {
                upload(req, res, async (err) => {
                    if (err) {
                      console.log(err);
                    } 
                    else {
                        const id=req.body.id
                        const About=req.body.About
                        const Place=req.body.Place
                        const Website=req.body.Website
                        const Password=req.body.Password
                        const Img=req.file.filename

                        const UpdataProfile=await Data.findByIdAndUpdate({_id:id},{$set:{About:About,Place:Place,Website:Website,Password:Password,Img:Img}})
                        if(UpdataProfile){
                              req.session.user_id = UpdataProfile._id;
                            
                            return res.status(200).redirect('/Profile')
                            // res.json({message:'Data Updated Sucessfully'})
                         }else{
                            res.status(400).json({message:'Error occured while updating data'})
                         }
                     } 
                   
            })
            } catch (error) {
                console.log(error.message)
            }
                
        }
    

        const AddPostForm=async(req,res)=>{
            try {
                
                const id=req.query.id
                const AddPost=await Data.findById({_id:id})
                console.log(AddPost)
                if(AddPost){
                    res.render('../views/post',{User:AddPost})
                    // res.sendFile(path.join(__dirname,'../views/edit.html'))
                }
                else{
                    res.json({message:'id not found'})
                }
            } catch (error) {
                console.log(error.message)
            }
        }

        const AddPost=async(req,res)=>{
            try {
                Upload(req, res, async (err) => {
                    const id=req.body.id
                    const title=req.body.title
                    const Discription=req.body.Discription
                    const image=req.file.filename
                             
                    const userInfo=await Data.findOne({_id:id})
                        if(userInfo){
                           const savePost=await userInfo.addPost(title,Discription,image)
                           console.log(savePost)
                         await  userInfo.save()
                              req.session.user_id = userInfo._id;
                            
                            return res.status(200).redirect('/Profile')
                        //   return  res.json({message:'Post Created Sucessfully'})
                         }else{
                            res.status(400).json({message:'Error occured while saving post'})
                         }
                     
                   
            })
            } catch (error) {
                console.log(error.message)
            }
                
        }


        // const AddFriendForm=async(req,res)=>{
        //     try {
        //        res.render('../views/Addfriend')
        //     } catch (error) {
        //         console.log(error.message)
        //     }
        // }

        const AddFriend=async(req,res)=>{
            try {
                upload(req, res, async (err) => {
                   const id=req.query.id
                    const User=await Data.findById({_id:id})
                   
                    if(User){
                 
                        const OtherUser=await Data.find()
                        const Users=await OtherUser.filter((item) =>{
                            return item._id != id
                         
                        } )
                       console.log(Users)
                            res.render('../views/AddFriend',{ UserData:Users})
                    }else{
                        res.json({message:'Error occured while sending Data'})
                    }
    
                
                   
            })
                
            } catch (error) {
                console.log(error.message)
            }
        }

module.exports={
    SignUp,
    SignIn,
    ForgotPass,
    UserRegister,
    VerifyLogin,
    ForgotUser,
    ProfileView,
    EditProfileForm,
    EditProfile,
    AddPostForm,
    AddPost,
    // AddFriendForm,
    AddFriend
}