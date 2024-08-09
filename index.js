import express from "express";
import mongoose, { Schema } from "mongoose";
const connectDB= async ()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/myapp');
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Error in connecting db");
    }

}
connectDB();
const userSchema = new mongoose.Schema({
    fullName : {
        type:String,
        required : true
    },
    userName : {
        type: String,
        required : true
    },
    phoneNo :{
        type : Number , 
        required : true
    },
    email : {
        type: String,
        required : true
    },
    password : {
        type: String , 
        required : true
    }, 
    gender :{
        type: String, 
        required : true 
    }
})
const User = mongoose.model('User', userSchema);
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"));
app.get("/" , (req , res)=>{
    res.render("home.ejs")
});
app.post("/register" , async (req , res)=>{
    try {
        const {fullName , userName, email , phoneNo , gender , password} = req.body;
        // console.log(fullName , userName, email , phoneNo , gender , password);
        let user = new User({
            fullName ,
            userName,
            email ,
            phoneNo ,
            gender , 
            password
        })
        await user.save();
        return res.status(201).send("User Creeated Successfully");
      
    } catch (error) {
        console.log(error)
        return res.send("User not created. Something went Wrong")
    }
})
app.listen(PORT , ()=>{
    console.log(`Server Started at port ${PORT}`);
});
