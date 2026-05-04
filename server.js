require("dotenv").config();
const express=require("express");
const bodyParser=require("body-parser");
const { connectDB } = require("./src/config/configdb");
const configViewEngine = require("./src/config/viewEngine");
const initWebRoutes=require("./src/routes/web");

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
configViewEngine(app);
initWebRoutes(app);
connectDB();
const port = process.env.PORT || 6969;
app.listen(port,()=>{
	console.log("Backend Nodejs is running on the port : " + port);
});