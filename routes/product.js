const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

// Отримати всі продукти
router.get('/', productController.getAllProducts);

// Отримати продукт за ID
router.get('/:id', productController.getProductById);

// Створити новий продукт
router.post('/', productController.createProduct);

// Оновити продукт
router.put('/:id', productController.updateProduct);

// Видалити продукт
router.delete('/:id', productController.deleteProduct);

module.exports = router;
