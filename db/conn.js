const mungoose=require('mongoose')

mungoose.connect('mongodb+srv://Asjad_2001:Asjad2001@cluster0.wtovo.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log('connection sucessfull')
}).catch(()=>{
    console.log('error occured')
})