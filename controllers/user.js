const User=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

//This is a validator function to check a given string
function stringValidator(string){
    return string===undefined||string.length===0?true:false
};

//This function is to generate json web tokens
function generateTokken(id,name){
    return jwt.sign({userId: id, name: name}, 'secretToken')
}

//Logic for signup for a user
const signup= async (req, res)=>{
    const {name,email,password}=req.body;
    try{
        //this will help us to validate the input taken by user
        if (stringValidator(name)||stringValidator(email)||stringValidator(password)){
            return res.status(401).json({err:"Invalid username or password"})
        };

        //To check whether the user already exist or not
        const users= await User.findOne({where:{'email':email }});

        //If the User already has an account
        if(users) return res.status(403).json({success: false, message: "User Already Exist"});

        //To hash and salt passwords securely and then save it in ourdatabase
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, async(err, hash)=>{
            await User.create({ name: name, email: email, password: hash });
            return res.status(201).json({success: true, message: "Succesfully create new User"});
        }) 
    } catch(err){
        return res.status(500).json({success: false, message:err})
    }
};

//Logic for login
const login=async (req, res)=>{
    const {email, password}=req.body;
    try{

        //To check whether the user exist in our database or not
        const users= await User.findAll({ where : { email }})

        //if your exists
        if(users.length>0){
            //this will compare input password value with hashed password
            bcrypt.compare(password, users[0].password, (err, result)=>{
                if(err) throw new Error('Something went wrong')
                else if(result) return res.status(200).json({success:true, message:'User Loged in Succesfully!', token:(generateTokken(users[0].id,users[0].name))})
                else return res.status(401).json({success: false, message: 'Please check your username/password!'})
            })
        }else{
            return res.status(404).json({success: false, message: `User Doesn't Exist!`})
        }
    }
    catch(err){
        return res.status(500).json({success: false, message:err})
    }
};

module.exports={
    signup,
    login
};