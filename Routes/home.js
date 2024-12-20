const express = require('express');
const app = express();
const product = require('../Models/productSchema');
const { verifyToken } = require('../jwt');
const Router = express.Router();

Router.get('/',async (req,res)=>{
    try {
        const response = await product.find();
        if(!response){
            
            res.status(400).json({msg:"data is not fetch"})
        }
        else res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error:"Server side error"})
    }
})
Router.post('/',verifyToken,async(req,res) => {
    try {
        const data =  req.body;
        const username = req.user.username;
        data.user = username;
        const newProduct = new product(data);
        const response = await newProduct.save();
        if(!response){
            
            res.status(400).json({msg:"data is not save"})
        }
        else res.status(200).json({msg:"data is save"});
    } catch (error) {
        res.status(500).json({error:"Server side error"})
    }
})

module.exports = Router;
