const Product = require('../models/Product');
const errorHandler = require('../utils/errorHandler');

module.exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.createProduct = async (req, res) => {
    try {
        const { name, brand, price } = req.body;
        const newProduct = new Product({ name, brand, price });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (e) {
        errorHandler(res, e);
    }
};
