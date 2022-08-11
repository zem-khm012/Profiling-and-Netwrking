const express=require('express')
const app=express()
const hbs=require('express-handlebars');
const dotenv=require('dotenv')
dotenv.config({path:'config.env'})
const port=process.env.PORT 
const path=require('path')
console.log(port)
var bodyParser = require('body-parser')
var cors = require('cors')
var session = require('express-session');
let ejs = require('ejs');
const multer = require('multer');
const socketIO =require('socket.io')
var http = require('http');
const server = http.createServer(app);
const io= socketIO(server);

app.set('view engine', 'ejs');
app.use(cors())

require('./socket/socket')(io);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
require('./db/conn')
app.use(require('./routes/routing'))

// app.engine('handlebars',hbs.engine);
// app.set('view engine', 'handlebars');
app.use(express.static('public'))


app.get('/',(req,res)=>{
    res.send('welcome to profile application')
})



app.listen(port,()=>{
    console.log(`server started at ${port}`)
})