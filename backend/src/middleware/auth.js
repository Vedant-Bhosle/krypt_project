const jwt = require('jsonwebtoken')
const User = require("../models/register")
const auth = async (req, res, next) => {
    try {

        const token = req.cookies.jwt;
        const verifyuser = jwt.verify(token, process.env.SECRET_KEY)
        console.log(verifyuser);
        const cur_user = await User.findOne({ _id: verifyuser._id });
        console.log(cur_user);
        req.token = token;
        req.user = cur_user;
        next();
    }
    catch (err) {
        res.status(401).send("YOU ARE NOT LOGGED IN")
console.log(err);
    }
}

module.exports = auth;