const User = require("../models/user");
const jwt = require('jsonwebtoken');
const expressJwt = require("express-jwt");
const SKEY = "BLIMAVLAMFMIDMEIDIEMDIMDEMDEIDMI";

exports.signup = async (req,res) => {
    const userExists = await User.findOne({ email: req.body.email });

    if(userExists){
        return res.status(403).json({
            error: "email is taken"
        });
    }
    const newuser = await new User(req.body);
    await newuser.save();
    res.status(201).json({message:"signup succes"});
};

exports.signin = (req,res) => {
    // find the user based on emial

    const { _id, name, email, password} = req.body;

    User.findOne({email}, (err,user) => {
        if (err || !user){
            return res.status(400).json({error:"nie ma"});
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "zle pasy ;"    
            });
        }

        const token = jwt.sign({_id:user._id}, SKEY);

        res.cookie("t", token, {expire: new Date() + 9999});

        const {_id,name,email} = user;
        return res.json({ token, user: {_id,name,email}});
    });
}

exports.signout = (req,res) => {
    res.clearCookie("t");
    return res.json({message:"signout suc"});
}

exports.requireSignin = expressJwt({
    secret: SKEY
});