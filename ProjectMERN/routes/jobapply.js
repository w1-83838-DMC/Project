const express= require('express');
const mysql2= require('mysql2');

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
    let queryText=`insert into job_application(job_id, seeker_id) values ('${request.body.job_id},'${request.body.seeker_id}'')`;

    let connection = mysql.createConnection(connectionString);
    connection.connect();
    connection.query(queryText,(err,result)=>{
          



        //    SELECT jp.email AS provider_email, js.name AS seeker_name, j.title AS job_title
        //FROM job_applications ja
        //JOIN jobs j ON ja.job_id = j.id
        //JOIN job_providers jp ON j.provider_id = jp.id
        //JOIN job_seekers js ON ja.seeker_id = js.id
        //WHERE ja.id = ?
    });
});