const express= require('express');
const mysql= require('mysql2');

var app= express.Router();

const connectionString=
            {
                host: "localhost",
                port: 3306,
                database : "jobportal",
                user: "dmc",
                password: "dmc"
            };
app.post("/",(request,response)=>{

    let job_id= request.body.job_id;
    let seeker_id=request.body.seeker_id;
    let queryText=`insert into job_application(job_id, seeker_id) values ( '${job_id}', '${seeker_id}')`;
    let connection = mysql.createConnection(connectionString);
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
                var errInString =JSON.stringify(err);
                response.setHeader("content-type","application/json");
                response.write(errInString);
                connection.end();
                response.end();
        }
    })
});

app.get("/",(request,response)=>{
    //  for particular job_id an seeker_id we get the jobs depends on the job_id and the seeker_id who is going to apply that jobs like firstname lastname contact no 
    let queryText=`select job_application.job_id,jobs.job_title,jobseeker.fname,jobseeker.lname,jobseeker.email,jobseeker.contactme from job_application INNER JOIN jobs ON jobs.job_id= job_application.job_id INNER JOIN jobseeker ON job_application.seeker_id=jobseeker.seeker_id`;
    console.log(queryText);
    let connection= mysql.createConnection(connectionString);
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
            var errInString= JSON.stringify(err);
            response.setHeader("content-type","application/json");
            response.write(errInString);
            connection.end();
            response.end();
        }
    })
});

module.exports=app;

