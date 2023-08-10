const express = require("express");
const errorHandler = require("./middleWare/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();


connectDb();
const app = express();

const port =process.env.PORT || 5000;
//when you accept some data from client to server you should be use body parser to get that data 
// for that we use middleware app.use(express.json())
app.use(express.json())
app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/users",require("./routes/userRoutes"));

app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`server is running on port  ${port}`)
})