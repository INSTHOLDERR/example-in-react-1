import express from "express"
import dotenv from "dotenv"
import path from "path"
import cors from "cors"

dotenv.config();
const app=express();
app.use(cors());
app.use(express.static("./dist"));

app.get("/get",(req,res)=>{
    return res.json("Get end point");
});

app.get("/*",(req,res)=>{
    return res.sendFile(path.resolve("./dist/index.html"));
});


app.listen(process.env.VITE_PORT,error=>{
    if(error){
        return console.log(error);
    }
    console.log("server started");
})
