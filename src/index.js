const express = require('express')
const app = express()
const { PORT, CLIENT_URL } = require('./constants')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const cors = require('cors')

require('./middlewares/passport-middleware')

const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/post')

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: CLIENT_URL,
    credentials: true
}))
app.use(passport.initialize())

app.use('/api', authRoutes)
app.use('/api', postRoutes)

const appStart = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Приложение работает на http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log(`Ошибка: ${error.message}`)
    }
}

appStart()
