const express = require('express');
const bodyParser =require('body-parser');

const usersRoute = require('./Routes/users-routes');
const httpError = require('./Models/http-error');

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
  });

app.use(bodyParser.json());
app.use('/api/users' ,usersRoute);




app.use((req, res , next) =>{
    throw new httpError('Could Not Find the route' , 404 );
});

app.use((error , req , res , next) =>{
    res.status(error.code || 500).json({message : error.message || "An Unknown Error "});
} );


app.listen(5000);