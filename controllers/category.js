const Category = require('../models/Category')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async (req, res) => {
    try {
        // Отримання всіх категорій
        const categories = await Category.find({})
        res.status(200).json(categories)
    } catch (e) {
        // Обробка помилок
        errorHandler(res, 500, e.message || 'Error while fetching categories')
    }
}

module.exports.getById = async (req, res) => {
    try {
        // Отримання категорії за ID
        const category = await Category.findById(req.params.id)

        if (category) {
            res.status(200).json(category)
        } else {
            errorHandler(res, 404, 'Category not found')
        }
    } catch (e) {
        // Обробка помилок
        errorHandler(res, 500, e.message || 'Error while fetching category')
    }
}

module.exports.create = async (req, res) => {
    try {
        // Створення нової категорії
        const category = new Category({
            name: req.body.name,
            imageScr: req.body.imageScr
        })
        await category.save()

        res.status(201).json({
            message: 'Category created successfully',
            category
        })
    } catch (e) {
        // Обробка помилок
        errorHandler(res, 500, e.message || 'Error while creating category')
    }
}

module.exports.remove = async (req, res) => {
    try {
        // Видалення категорії за ID
        await Category.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message: 'Category deleted successfully'
        })
    } catch (e) {
        // Обробка помилок
        errorHandler(res, 500, e.message || 'Error while deleting category')
    }
}

module.exports.update = async (req, res) => {
    try {
        // Оновлення категорії за ID
        const categoryForUpdate = {
            name: req.body.name
        }

        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { $set: categoryForUpdate },
            { new: true } // Повернути оновлену категорію
        )

        if (category) {
            res.status(200).json({
                message: 'Category updated successfully',
                category
            })
        } else {
            errorHandler(res, 404, 'Category not found')
        }
    } catch (e) {
        // Обробка помилок
        errorHandler(res, 500, e.message || 'Error while updating category')
    }
}
