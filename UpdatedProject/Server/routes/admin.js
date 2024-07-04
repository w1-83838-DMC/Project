const express = require('express');
var app = express.Router();

app.get("/",(request,response)=>{
    response.write("GET for Admin Received");
})

app.post("/",(request,response)=>{
    response.write("POST for Admin Received");
})

app.put("/",(request,response)=>{
    response.write("Put for Admin received ");
})

app.delete("/",(request,respose)=>{
    respose.write("Delete for Admin received");
    respose.end();
})

module.exports=app;