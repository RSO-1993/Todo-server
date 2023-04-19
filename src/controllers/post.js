const db = require('../db')

exports.createPost = async (req, res) => {
    const { title, description, completed, user_of_creation } = req.body
    try {
        await db.query(
            'insert into posts(title, description, completed, user_of_creation) values ($1, $2, $3, $4)',
            [title, description, completed, user_of_creation]
        )
        return res.status(200)
            .json({
                success: true,
                message: 'Пост успешно добавлен!'
            })
    } catch (error) {
        console.log(error.message)
        return res.status(500)
            .json({
                error: error.message
            })
    }
}

exports.getPosts = async (req, res) => {
    try {
        const { rows } = await db.query(
            'select * from posts'
        )
        return res.status(200)
            .json({
                success: true,
                posts: rows
            })
    } catch (error) {
        console.log(error.message)
    }
}

exports.getPost = async (req, res) => {
    const { id } = req.params
    try {
        const { rows } = await db.query(
            'select * from posts where id = $1',
            [id]
        )
        return res.status(200)
            .json({
                success: true,
                posts: rows
            })
    } catch (error) {
        console.log(error.message)
    }
}

exports.updatePost = async (req, res) => {
    const { id } = req.params
    const { title, description } = req.body
    try {
        await db.query(
            'update posts set title = $1, description = $2 where id = $3',
            [title, description, id]
        )
        return res.status(200)
            .json({
                success: true,
                message: 'Пост успешно изменен!'
            })
    } catch (error) {
        console.log(error.message)
        return res.status(500)
            .json({
                error: error.message
            })
    }
}

exports.completedPost = async (req, res) => {
    const { id } = req.params
    const { completed } = req.body
    try {
        await db.query(
            'update posts set completed = $1 where id = $2',
            [completed, id]
        )
        return res.status(200)
            .json({
                success: true,
                message: 'Статус успешно изменен!'
            })
    } catch (error) {
        console.log(error.message)
        return res.status(500)
            .json({
                error: error.message
            })
    }
}

exports.deletePost = async (req, res) => {
    const { id } = req.params
    try {
        await db.query(
            'delete from posts where id = $1',
            [id]
        )
        return res.status(200)
            .json({
                success: true,
                message: 'Пост успешно удален!'
            })
    } catch (error) {
        console.log(error.message)
        return res.status(500)
            .json({
                error: error.message
            })
    }
}
