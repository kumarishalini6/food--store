var http=require('http')
var app=require('./index')
var ser=http.createServer(app)
ser.listen(2000,console.log("server is ok"))
