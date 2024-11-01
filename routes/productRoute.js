const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const { 
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsName,
    searchProduct
} = require('../controllers/productController');

/**
 * @swagger
 * /api/product/products:
 *   get:
 *     tags: [Product]
 *     security: []
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: Successfully retrieved all products
 *       404:
 *         description: Products not found
 *       500:
 *         description: Server error
 */
router.get('/products', getProducts);

/**
 * @swagger
 * /api/product/productsName:
 *   get:
 *     tags: [Product]
 *     security: []
 *     summary: Get all products {id,name}
 *     responses:
 *       200:
 *         description: Successfully retrieved all products
 *       404:
 *         description: Products not found
 *       500:
 *         description: Server error
 */
router.get('/productsName', getProductsName);

/**
 * @swagger
 * /api/product/{productId}:
 *   get:
 *     tags: [Product]
 *     security: []
 *     summary: Get product by ID
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved product
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.get('/:productId', getProductById);

/**
 * @swagger
 * /api/product:
 *   post:
 *     tags: [Product]
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - tags
 *               - productCreator
 *             properties:
 *               title:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               productCreator:
 *                 type: string
 *               privateURL:
 *                 type: string
 *               privateTemplate:
 *                 type: string
 *               price:
 *                 type: string
 *               uploadVideoUrl:
 *                 type: string
 *               uploadImgUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/', isAuth, createProduct);

/**
 * @swagger
 * /api/product/{productId}:
 *   put:
 *     tags: [Product]
 *     summary: Update a product by ID
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               productCreator:
 *                 type: string
 *               privateURL:
 *                 type: string
 *               privateTemplate:
 *                 type: string
 *               price:
 *                 type: number
 *               uploadVideoUrl:
 *                 type: string
 *               uploadImgUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.put('/:productId', isAuth, updateProduct);

/**
 * @swagger
 * /api/product/{productId}:
 *   delete:
 *     tags: [Product]
 *     summary: Delete a product by ID
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.delete('/:productId', isAuth, deleteProduct);

/**
 * @swagger
 * /api/product/search:
 *   get:
 *     summary: Search for products by title, tag, or productCreator
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         required: true
 *         description: The search term (can be part of a tag, title, or productCreator)
 *     responses:
 *       200:
 *         description: List of matching products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: No matching products found
 *       500:
 *         description: Server error
 */
router.get('/search', searchProduct);
module.exports = router;
