const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const errorHandler = require('../utils/errorHandler')
const User = require('../models/User')
const keys = require('../config/keys')

module.exports.login = async (req, res) => {
    try {
        // Знайти користувача за email
        const userDb = await User.findOne({ email: req.body.email })

        if (!userDb) {
            return errorHandler(res, 404, 'User not found')
        }

        // Перевірка пароля
        const isPasswordValid = bcrypt.compareSync(req.body.password, userDb.password)
        
        if (!isPasswordValid) {
            return errorHandler(res, 401, 'Invalid credentials')
        }

        // Генерація токену
        const token = jwt.sign(
            { email: userDb.email, userId: userDb._id }, 
            keys.Jwt, 
            { expiresIn: '2h' }  // Токен діє 2 години
        )

        // Відправити відповідь з токеном
        res.status(200).json({
            token: `Bearer ${token}`
        })

    } catch (e) {
        // Якщо сталася помилка, обробити її
        errorHandler(res, 500, e.message || 'Error during login')
    }
}

module.exports.register = async (req, res) => {
    try {
        // Перевірити, чи користувач вже існує за email
        const userDb = await User.findOne({ email: req.body.email })

        if (userDb) {
            return errorHandler(res, 409, 'Email already exists')
        }

        // Генерація сілі та хешування пароля
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)

        // Створити нового користувача
        const newUser = new User({
            email: req.body.email,
            password: hashedPassword
        })

        // Зберегти користувача в базі
        await newUser.save()

        // Відправити успішну відповідь з новим користувачем
        res.status(201).json({
            message: 'User successfully registered',
            user: newUser
        })

    } catch (e) {
        // Якщо сталася помилка, обробити її
        errorHandler(res, 500, e.message || 'Error during registration')
    }
}
