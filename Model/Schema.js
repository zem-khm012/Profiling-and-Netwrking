const mongoose=require('mongoose');
const dotenv=require('dotenv')
dotenv.config({path:'./Config.env'})
const db=process.env.DB
mongoose.connect(db).then(()=>{console.log('connectin sucessfull')}).catch(()=>{console.log('errror occured')})


const UserSchema=new mongoose.Schema({
    Fname:{
        type:String,
        required:true
    },
    Lname:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
     
    About:{
        type:String,
        required:true
    },
    Place:{
        type:String,
        required:true
    },
    Website:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Img:{
        type:String,
        required:true
    },
    post:[
        {
        title:{
            type:String,
            required:true
        },
        Discription:{
            type:String,
            required:false
         },
        image:{
            type:String,
            required:true
        }
    }],
    sentRequest:[{
        Fname:{
            type:String,
            default:''
        }
    }],
    request:[{
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Data'
        }
    }],
    friendList:[{
        friendId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Data'
        },
        friendName:{
            type:String,
            default:''
        }
    }],
    totalRequest:{
        type:Number,
        default:0
    }

})

UserSchema.methods.addPost=async function(title,Discription,image){
    try {
        this.post = this.post.concat({title,Discription,image})
        await this.save()
        return this.post;
    } catch (error) {
        console.log(error.message)
    }
}

const Data=mongoose.model('DATA',UserSchema)

module.exports=Data