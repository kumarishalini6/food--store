var exp=require('express')
var rt=exp.Router()

var path=require('path')
const usr=require('../model/sche')
const  mg = require('mongoose')
const { query } = require('express')
const { Script } = require('vm')
const passport = require('passport')

rt.get('/',function(req,res){
    res.render('home')
})
rt.post('/abc',function(req,res){
    res.render('reg')
})

rt.post('/bcd',function(req,res){
    res.render('login')
})


rt.get('/regis',function(req,res){
    res.render('reg',{msg:req.flash('msg')})
})

rt.post('/code',function(req,res){
    const usr1= new usr({
        _id:new mg.Types.ObjectId,
        name:req.body.t1,
        email:req.body.t2,
        pwd:req.body.t3,
        confirmpwd:req.body.t4
    })
    usr1.save().then(result=>{
        
       // req.flash('msg','data saved')
        res.redirect("/users/login")
        //res.render('suc',{msg:"data inserted"})
    })
    .catch(err=>{
        console.log(" "+err)
    })
})
rt.get('/list',(req,res)=>{
    usr.find().then((result)=>{
        res.render('list',{data:result})
    })
    .catch(err=>{
        console.log(err)
    })
})
rt.get("/edit",function(req,res){
    usr.find({_id:req.query.id}).then((result)=>{
        res.render('detail',{data:result})
    })
    .catch(err=>{
        console.log(err)
    })
})
rt.post('/update',function(req,res){
    var myquery={_id:req.body.t10};
    var newvalues={ $set: {name:req.body.t1,email:req.body.t2,pwd:req.body.t3}};
    usr.updateOne(myquery,newvalues)

    .then(res.redirect("/users/list")
    )
    .catch(err=>{
        console.log(" "+err)
    })
})
rt.get('/del',function(req,res){
    
    usr.deleteOne({_id:req.query.id}).then((result)=>{
        res.redirect("/users/list")

    })
    .catch(err=>{
        console.log(err)
    })
})

rt.get('/google',passport.authenticate('google',{ scope:['profile']}));

rt.get('/google/auth/callback',function(req,res){
   // res.send("its true we found you")
   res.render('rest')
})

rt.get('/login',(req,res)=>{
    res.render('login')
})
rt.post("/log",function(req,res){
    email=req.body.s1;
    pwd=req.body.s2;
    usr.findOne({email:email,pwd:pwd},function(err,user){
        if(!user){
            res.send("data not available")
          
        }
        else{
            res.render('rest',{user1:user})
         
        }
    })
})


module.exports=rt