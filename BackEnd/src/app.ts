const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
const { use, setResponse } = require('./common')
const http = require('http');
var cors = require("cors");
const app:any = express();
import { sequelizeConnection } from'./db/sql';

sequelizeConnection.sync();


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/../client")));

app.use(express.json())
app.use(cors());

// app.use(userRouter)
// //---- import all routers from routers folder------
var normalizedPath = require("path").join(__dirname, "routers");


require("fs").readdirSync(normalizedPath).forEach(function(file:any) {
  let files = require("./routers/" + file);
  app.use(files);
});
//-------------------------------------------------


app.use(( req:any, res:any, next:any)=>{
  res.status(200).send();
})


app.use((err:any, req:any, res:any, next:any)=>{
    setResponse(res,500,'E',`${err}`).status(500).send();
})
app.use( '/',()=>console.log("HIIIIIII"))

export {app}