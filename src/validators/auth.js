const { check } = require('express-validator')
const db = require('../db')
const { compare } = require('bcryptjs')

const login = check('login')
    .isLength({ min: 3, max: 25 })
    .withMessage('Логин должен содержать не менее 3 и не более 15 символов!')

const password = check('password')
    .isLength({ min: 6, max: 15 })
    .withMessage('Пароль должен содержать не менее 6 и не более 15 символов!')

const email = check('email')
    .isEmail()
    .withMessage('Пожалуйста, введите действительный адрес электронной почты!')

const emailExists = check('email')
    .custom(async (value) => {
        const { rows } = await db.query(
            'select * from users where email = $1',
            [value]
        )
        
        if (rows.length) {
            throw new Error('Электронная почта уже существует!')
        }
    })

const loginFieldsCheck = check('email')
    .custom(async (value, { req }) => {
        const user = await db.query(
            'select * from users where email = $1',
            [value]
        )

        if (!user.rows.length) {
            throw new Error('Электронная почта не существует!')
        }

        const validPassword = await compare(
            req.body.password, user.rows[0].password
        )

        if (!validPassword) {
            throw new Error('Неправильный пароль!')
        }

        req.user = user.rows[0]
    })

module.exports = {
    registerValidation: [login, email, password, emailExists],
    loginValidation: [loginFieldsCheck]
}
