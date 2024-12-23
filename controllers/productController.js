const Product = require('../models/ProductModel');

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('categoryId', 'tags');
        if (!products) {
            return res.status(404).json({ message: 'No products found' });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all products
const getProductsName = async (req, res) => {
    try {
        const products = await Product.find();
        if (!products) {
            return res.status(404).json({ message: 'No products found' });
        }
        const filterProducts = products.map(product => ({
            id: product._id,
            title: product.title
        }));
        res.status(200).json(filterProducts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get a product by ID
const getProductById = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId).populate('categoryId', 'title');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Create a new product
const createProduct = async (req, res) => {
    const { 
        categoryId, 
        title, 
        description, 
        tags, 
        productCreator, 
        privateURL, 
        privateTemplate, 
        price, 
        uploadVideoUrl,  // Updated field name
        uploadImgUrl 
    } = req.body;

    try {
        const newProduct = new Product({
            categoryId,
            title,
            description,
            tags,
            productCreator,
            privateURL,
            privateTemplate,
            price,  // Ensure this is passed as a number
            uploadVideoUrl,  // Updated field name
            uploadImgUrl
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server', error:error.message });
    }
};

// Update a product by ID
const updateProduct = async (req, res) => {
    const { productId } = req.params;
    const {
        categoryId,
        title,
        description,
        tags,
        productCreator,
        privateURL,
        privateTemplate,
        price,
        uploadVideoUrl,  // Updated field name
        uploadImgUrl
    } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                categoryId,
                title,
                description,
                tags,
                productCreator,
                privateURL,
                privateTemplate,
                price,  // Ensure this is passed as a number
                uploadVideoUrl,  // Updated field name
                uploadImgUrl
            },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const searchProduct = async (req, res) => {
    const { searchTerm } = req.query; 

    try {
        const products = await Product.find({
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } },
                { productCreator: { $regex: searchTerm, $options: 'i' } }, 
                { tags: { $in: await Tags.find({ title: { $regex: searchTerm, $options: 'i' } }).select('_id') } } 
            ]
        }).populate('tags').populate('productCreator');

        if (products.length === 0) {
            return res.status(404).json({ message: 'لا توجد نتائج مطابقة' });
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'حدث خطأ في السيرفر', error });
    }
};


module.exports = {
    searchProduct,
    deleteProduct,
    updateProduct,
    createProduct,
    getProductById,
    getProductsName,
    getProducts
}