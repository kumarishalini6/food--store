var exp=require('express')
var app=exp()
var usr=require('./api/rot/users')
var admin=require('./api/rot/admin')
var path=require('path')
var bp=require('body-parser')
var mg=require('mongoose')
var session=require('express-session')
var flush=require('connect-flash')
var ps=require('./config/passport_set')

app.use(session({
    secret:'secret',
    cookie:{maxAge:60000},
    resave:false,
    saveUninitialized:false
}))
app.use(flush())

mg.connect('mongodb+srv://shalini:123Abc@testing.rpzol.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true,useUnifiedTopology: true })
mg.connection.on('error',err =>{
    console.log("data error",+err)
})

mg.connection.on('connected', connected=>{
    console.log("data connected")
})
app.use(bp.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(exp.static(path.join(__dirname,'views')))

app.use('/users',usr)
app.use('/admin',admin)



module.exports=app