
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const registersechema = new mongoose.Schema({

    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})


//generating token
registersechema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, "mynameisvedantbhosleandiamfromvit")
        console.log("secret key: "+process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token })
        await this.save();
        return token;
    }
    catch (err) {
        console.log("Token error");
        console.log(err);
    }

}



//


//hashing(middleware)

registersechema.pre("save", async function (next) {
    if (this.isModified("password")) {



        // const passwordhash = await bcrypt.hash(password, 10)

        this.password = await bcrypt.hash(this.password, 10);
        this.cpassword = this.password;
    }
    next();

})





const User = new mongoose.model("User", registersechema)
module.exports = User;