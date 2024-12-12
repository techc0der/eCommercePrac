const mongoose = require('mongoose');

// Define the schema for a product
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Ensures this field is mandatory
        trim: true, // Removes extra spaces
    },
    price: {
        type: Number,
        required: true,
        min: 0, // Ensures the price is non-negative
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Electronics', 'Clothing', 'Furniture', 'Food', 'Other'], // Example categories
        trim: true,
    },
    img: {
        type: String,
        required: true, // URL to the product image
    },
    user: {
        type: String,
        ref: 'User', // Reference to the User model
        required: false, // Optional field
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
