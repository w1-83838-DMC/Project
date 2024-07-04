const express= require('express');
const cors=require('cors');
const jwt= require('jsonwebtoken')
//const routeToSignIn=require('./routes/signin');
 
const routeTojobs=require('./routes/jobpost');
const routeTojobseeker=require('./routes/jobseeker');
const routeTojobapply= require("./routes/jobapply");

//const routeToAdmin=require('./routes/admin');

const secretkey="sunbeaminfo.com";

const app=express();
app.use(cors());
app.use(express.json());

app.use((request,response,next)=>{
    if(request.url=='/jobseeker/signin' || request.url=='/jobseeker/signup'){
        next()
    }else 
    {
        const token=request.headers['token']
        if(!token || token.length==0){
            response.send();
        }else {
            try{
                const payload= jwt.verify(token,secretkey)

                request.user=payload;
                
                next()

            }catch(ex)
            {
                response.send();
            }
        }
    }
})

//app.use("/signin",routeToSignIn);
app.use("/jobpost",routeTojobs);
app.use("/jobseeker",routeTojobseeker);
app.use("/jobapply",routeTojobapply);

//app.use("/admin",routeToAdmin);

app.listen(9999,()=>{
    console.log("Server is started ....");
})
