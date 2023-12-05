require('dotenv').config()
const express=require('express');
const bcrypt = require('bcryptjs')
const auth=require('../middleware/auth')
const router=express.Router();
const { check, validationResult } = require('express-validator')

const User = require('../models/register')

router.get("/",(req,res)=>{
    res.send("Api is running Successfully..."+process.env.SECRET_KEY)
    
})

///login route///////////////////////////////////
router.post("/login",async(req,res)=>{
    try {

        const email = req.body.email;
        const password = req.body.password;
        const useremail = await User.findOne({ email: email })
        // hash check
        const isMatch = await bcrypt.compare(password, useremail.password)
        console.log(isMatch);
        const token = await useremail.generateAuthToken()
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 864000000 ),
            httpOnly: true
        })
        localStorage.setItem("jwt",token);

        if (isMatch) {

            res.status(201).send({token:token,message:"logged in succesfully"})

        } else {
            res.status(400).send( {
                message: "Invalid Credentials !"
            })
        }

    }
    catch (err) {
        res.status(400).send( {
            message: "Invalid Credentials !",
           
        })
        console.log(err);
    }
})



//register route  ////////////////////////////
router.post("/register", [
    check("fname", 'this must be 3+ character long').exists().isLength({ min: 3 }),
    check("lname", 'this must be 3+ character long').exists().isLength({ min: 3 }),
    check("email", 'Enter a valid Email').exists().isEmail().normalizeEmail(),
    check("phone", 'Phone Number must have 10 digits').isLength({ min: 10 }),
    check("password", 'password is too short').exists().isLength({ min: 4 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const alerts = errors.array();
        res.status(400).send({errors:alerts});
    }
    else {

        try {
            const {fname,lname,email,phone,password,cpassword}=req.body;
           
            
//checking if user is already is registered or not
            const useremail = await User.findOne({ email: email })
if(useremail)return  res.status(500).send( {message:"user with this credentials is already exists"} );

           
                const registerUser = new User({
                    fname,
                    lname,
                    email,
                    phone,
                    password,
                    cpassword
                })

                // create token
                const token = await registerUser.generateAuthToken();


                cookie
                res.cookie("jwt", token, {
                    expiresIn: "1m",
                    httpOnly: true
                })

                //



                const registered = await registerUser.save();
                // console.log("user saved succesfully");
                res.status(200).send({ message: "You Are Registered Succesfully" })
            
            
        }
        catch (err) {
            res.status(500).send({message: "Something went wrong,error during registeration.Please refresh the site." })

        }
    }

})

router.get("/checklogin",auth, async (req,res)=>{
    try {
        console.log("Here we check user is logged in or not");
        res.status(200).send("you are looged in");
    } catch (error) {
        console.log("error from checklogin");
        console.log(error);
    }
   
})

router.get("/getcookie", async (req,res)=>{
   let jwt= res.cookie.jwt;
   if(jwt){
       console.log("jwt is getting");
       res.status(200).send("jwt is getting")
   }
})

//logout route  ////////////////////////////
router.get("/logout",auth,  async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((elem) => {
            return elem.token !== req.token;
        })


        res.clearCookie("jwt")
        console.log("Logout Succesfully");
       const user= await req.user.save();
        res.status(201).send({message:"logout successfully",
    user:user})
    } catch (err) {
        res.status(500).send({ message: "Something went wrong.Please refresh the site." })
    }

})

module.exports=router;