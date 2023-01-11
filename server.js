const express = require('express');
const cors = require('cors');

const port = 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(require('./apiRoute'));

//global error handling
app.use(function(err,req,res){
    console.log(err.stack);
})
//Mongo connecting
const db = require('./mongoConnect');

db.connectToServer(function(err){
    if(err){
        console.error(err);
        process.exit();
    }
})


app.listen(port,()=>{
    console.log(`Server running on port : ${port}`);
});