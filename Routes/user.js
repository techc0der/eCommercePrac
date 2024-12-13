const express = require('express');
const Router = express.Router();
const User = require('../Models/userSchema');
const { GenerateToken } = require('../jwt');

Router.post('/signup', async (req, res) => {
    try {
        const { username, email, password, name } = req.body;
        const newUser = new User({ username, name, email, password });
        const oldUser = await User.findOne({ username });
        if (oldUser) {
            return res.status(400).json({ msg: "user is already register" })
        }

        const response = await newUser.save();

        console.log(response);
        if (!response) {
            return res.status(400).json({ msg: "user is not save" })
        }
        
        res.status(200).json({ msg: "User is Register", response });
    } catch (error) {
        res.status(500).json({ error: "Server side error" })
    }
})

Router.post('/login', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        const response = await user.matchPassword(password);
        if (!response) {
            return res.status(400).json({ msg: "Invalid password" })
        }
        const userJwtData = {
            username,
            email
        }
        const token = await GenerateToken(userJwtData);
        console.log(token)
        res.status(200).json({ msg: "User is login", token: token });
    } catch (error) {
        res.status(500).json({ error: `Server side error ${error}` });
    }
})

module.exports = Router;
