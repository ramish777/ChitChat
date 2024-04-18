const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/jwtToken.js");

router.route('/signup').post(async (req, res) => {
    const { username, password, confirmPassword, fullName, gender } = req.body;

    const boyDp = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlDp = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    if (password === confirmPassword) {
        try {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ error: "Username already exists" });
            }

            // //hash password using bcrypt
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            //console.log(hashedPassword); 

            const newUser = new User({
                fullName,
                username,
                password : hashedPassword,
                gender,
                ProfilePic: gender === "male" ? boyDp : girlDp
            });
            
            if(newUser){
                await newUser.save();

                generateToken(newUser._id, res);
    
                return res.json('User added!');
            }
        } catch (err) {
            return res.status(400).json({ error: "Error occurred while signing up" });
        }
    } else {
        return res.status(400).json({ error: "Passwords do not match" });
    }
});

router.route('/login').post(async (req, res) => {
    const { username, password } = req.body; // Retrieve username and password from request body

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // Generate and set JWT token
        generateToken(user._id, res);

        // Send response with user data
        return res.status(200).json({
            _id: user._id,
            name: user.fullName,
            username: user.username,
            ProfilePicture: user.ProfilePic,
        });
    } catch (error) {
        console.error("Error occurred during login:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.route('/logout').post((req, res) => {
    try{
        res.cookie("jwt" , "", {maxAge: 0});
        res.status(200).json({message:"logout successfully"});

    }catch(error){
        console.error("Error occurred during logout:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;