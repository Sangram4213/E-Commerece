const app = require('./app');

const dotenv = require("dotenv");
const connectDataBase= require("./config/database");

//config
dotenv.config({path:"backend/config/config.env"});

// Connect to database

connectDataBase();

app.listen(process.env.PORT,()=>{

    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})