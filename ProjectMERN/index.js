const express= require('express');
const cors=require('cors');
//const routeToSignIn=require('./routes/signin');
 
const routeTojobs=require('./routes/jobpost');
const routeTojobseeker=require('./routes/jobseeker');
const routeTojobapply= require("./routes/jobapply");

//const routeToAdmin=require('./routes/admin');

const app=express();
app.use(cors());
app.use(express.json());

//app.use("/signin",routeToSignIn);
app.use("/jobpost",routeTojobs);
app.use("/jobseeker",routeTojobseeker);
app.use("/jobapply",routeTojobapply);


//app.use("/admin",routeToAdmin);

app.listen(9999,()=>{
    console.log("Server is started ....");
})
