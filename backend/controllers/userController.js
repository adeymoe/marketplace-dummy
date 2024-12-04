import validator from "validator";
import bcrypt from "bcrypt"
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}


//Route for User Login
const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;

        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success:false, message:"User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){
            const token = createToken(user._id)
            res.json({success:true,token})
        }
        else{
            res.json({success:false, message: 'Invalid details'})
            console.log(error);
            res.json({success:false,message:error.message})
        }

    } catch (error) {
        
    }
}

//Route for user registration
const registerUser = async (req,res) => {
    try {
        const {name, email, password} = req.body;

        // checking User already exists
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false, message:"User already exists"})

        }

        //Validating email format and strong password

        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Please enter a valid email"})
        }
        if (password.length < 8) {
            return res.json({success:false, message:"Please enter a strong password"})
        }

        //HASHING USER PASSWORD
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({success:true,token})




    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
        
    }

    
}

//Route for admin Login
const adminLogin = async (req,res) => {
    try {
        
        const {email,password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true, token})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }

    
}


export {loginUser, registerUser, adminLogin}