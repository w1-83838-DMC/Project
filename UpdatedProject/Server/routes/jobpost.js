const express=require('express');
const mysql2= require('mysql2');

var app= express.Router();

const connectionString=
                    {
                        host:"localhost",
                        port:3306,
                        database:"jobportal",
                        user:"dmc",
                        password:"dmc"
                    };
app.get("/",(request,response)=>{
    let queryText = `select * from jobs`;
    let connection=mysql2.createConnection(connectionString);
    connection.connect();
    connection.query(queryText,(err,result)=>{
        if(err==null)
            {
                var resultInString=JSON.stringify(result);
                response.setHeader("Content-type","application/json");
                response.write(resultInString);
                connection.end();
                response.end();
            }
        else
            {
                var errInString= JSON.stringify(err);
                response.setHeader("Content-type","application/json");
                response.write(errInString);
                connection.end();
                response.end();
            }
    });
});

app.post("/",(request,response)=>{
    let provider_id= request.body.provider_id;
    let job_title= request.body.job_title;
    let job_description= request.body.job_description;
    let location= request.body.location;
    let category_id=request.body.category_id;
    let experienece_required=request.body.experienece_required;
    let salary=request.body.salary;
    let companyname=request.body.companyname;
    let companyimage=request.body.companyimage;
    
    let queryText= `insert into jobs (provider_id,job_title,job_description,location,category_id,experienece_required,salary,companyname,companyimage) values ('${provider_id}','${job_title}','${job_description}','${location}','${category_id}','${experienece_required}','${salary}','${companyname}','${companyimage}')`;
    console.log(queryText);
    let connection= mysql2.createConnection(connectionString);
    connection.connect();
    connection.query(queryText,(err,result)=>{
        if(err==null)
            {
                var resultInString = JSON.stringify(result);
                response.setHeader("content-type","application/json");
                response.write(resultInString);
                connection.end();
                response.end();
            }
        else 
        {
            var errInString= JSON.stringify(err);
            response.setHeader("content-type","application/json");
            response.write(errInString);
            connection.end();
            response.end();
        }
    });
});

app.delete("/:job_id",(request,response)=>{
    let job_id= request.params.job_id;

    let queryText= `delete from jobs where job_id = ${job_id}`;

    let connection = mysql2.createConnection(connectionString);
    connection.connect();
    connection.query(queryText,(err,result)=>{
        if(err==null)
            {
                var resultInString= JSON.stringify(result);
                response.setHeader("content-type","application/json");
                response.write(resultInString);
                connection.end();
                response.end();
            }
        else
        {
                var errInString=JSON.stringify(err);
                response.setHeader("content-type","application/json");
                response.write(errInString);
                connection.end();
                response.end();
        }
    });
});

app.put("/:job_id",(request,response)=>{
     let job_id=request.params.job_id;
     let job_title=request.body.job_title;
     let job_description=request.body.job_description;
     let salary=request.body.salary;


     let queryText= `update jobs set job_title='${job_title}',job_description='${job_description}',salary='${salary}' where job_id=${job_id}`;
     let connection=mysql2.createConnection(connectionString);
     connection.connect();
     connection.query(queryText,(err,result)=>{

        if(err==null)
            {
                var resultInString=JSON.stringify(result);
                response.setHeader("content-type","application/json");
                response.write(resultInString);
                connection.end();
                response.end();
            }
        else
            {
                var errInString=JSON.stringify(err);
                response.setHeader("content-type","application/json");
                response.write(errInString);
                connection.end();
                response.end();
            }
     });

});




module.exports=app;
