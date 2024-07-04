const express = require('express');
const mysql = require('mysql2');
const jwt= require('jsonwebtoken')

var app = express.Router();

const secretkey="sunbeaminfo.com";

const connectionString = 
                { 
                    host: "localhost", 
                    port: 3306, 
                    database: "jobportal", 
                    user:"dmc", 
                    password : "dmc" 
                };

 app.get("/", (request, response)=>
 {
    let queryText = `select * from jobseeker`;
    console.log(queryText);
    let connection = mysql.createConnection(connectionString);

    connection.connect();
    connection.query(queryText, (err, result)=>{
        console.log(result);
        if(err==null)
        {
            var resultInString = JSON.stringify(result);
            response.setHeader("content-type", "application/json");
            response.write(resultInString);
            connection.end();
            response.end();
        }
        else
        {
            var errInString = JSON.stringify(err);
            response.setHeader("content-type", "application/json");
            response.write(errInString);
            connection.end();
            response.end();
        }
    });
});



app.post("/signup", (request, response)=>{
    let queryText = `insert into jobseeker(fname,lname,email,password,contactme,state,city) values ('${request.body.fname}', '${request.body.lname}','${request.body.email}','${request.body.password}','${request.body.contactme}','${request.body.state}','${request.body.city}')`;
    
    let connection = mysql.createConnection(connectionString);
    connection.connect();
    connection.query(queryText, (err, result)=>{
        if(err==null)
            {
                var resultInString = JSON.stringify(result);
                response.setHeader("content-type", "application/json");
                response.write(resultInString);
                connection.end();
                response.end();
            }
    });
});

app.put("/:seeker_id", (request, response)=>{
    let seeker_id = request.params.seeker_id;
    let fname = request.body.fname;
    let lname = request.body.lname;
    let email = request.body.Email;
    let password= request.body.password;
    let contactme = request.body.contactme;
    let state = request.body.state;
    let city = request.body.city;

    let queryText= `update jobseeker set fname = '${fname}', lname ='${lname}',email = '${email}',password ='${password}',contactme='${contactme}',state='${state}',city='${city}' where seeker_id=${seeker_id}`;
    
    console.log(queryText);

    let connection = mysql.createConnection(connectionString);
    connection.connect();
    connection.query(queryText, (err, result)=>{
        if(err==null)
            {
                var resultInString = JSON.stringify(result);
                response.setHeader("content-type", "application/json");
                response.write(resultInString);
                connection.end();
                response.end();
            }
            else{
                var errInString= JSON.stringify(result);
                response.setHeader("content-type","application/json");
                response.write(errInString);
                connection.end();
                response.end();
            }
    });
});


app.delete("/:seeker_id", (request, response)=>{
    let seeker_id = request.params.seeker_id;
   
    let queryText = `delete from jobseeker where seeker_id = ${seeker_id}`;

    console.log(queryText);
    
    let connection = mysql.createConnection(connectionString);
    connection.connect();
    connection.query(queryText, (err, result)=>{
        if(err==null)
        {
            var resultInString = JSON.stringify(result);
            response.setHeader("content-type", "application/json");
            response.write(resultInString);
            connection.end();
            response.end();
        }
        else
        {
            var errInString = JSON.stringify(err);
            response.setHeader("content-type", "application/json");
            response.write(errInString);
            connection.end();
            response.end();
        }
    });
});

app.post("/signin",(request,response)=>{
    let email= request.body.email
    let password= request.body.password;

    var reply={jwtoken: undefined,message: ""};
    console.log("Email received is "+ email);
    console.log("Password received is "+ password);

    let queryText = `select email,password from jobseeker where email='${email}' and password='${password}';`
    console.log(queryText);
    let connection= mysql.createConnection(connectionString);
    connection.connect();
    connection.query(queryText,(err,result)=>{
    console.log(err);
    console.log(result);
        if(result)
            {
                var payload = {
                                    username: request.body.email,
                                    datetime: new Date().toString(),
                                    role: "employee ",
                                    RandomNo: Math.random()
                            };
                //reply.jwtoken= jwt.sign(payload,secretkey);
                //reply.message="success";
                var token= jwt.sign(payload,secretkey);
                var outputToBeSent={ jwtoken: token,message: "success"};
                response.write(JSON.stringify(outputToBeSent));
                response.send();

            }
        else 
            {
                reply.message="User is invalid ? ";
                response.write(JSON.stringify(reply));
            }
        response.end();

    })

})

module.exports = app;