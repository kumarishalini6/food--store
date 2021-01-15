var exp=require('express')
var rt=exp.Router()
rt.get('/',function(req,res){
    res.send("this is get method from admin")
})
rt.post('/',function(req,res){
    res.send("this is post method from admin")
})
module.exports=rt