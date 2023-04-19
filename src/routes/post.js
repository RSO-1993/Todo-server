const { Router } = require('express')
const { 
    createPost, 
    completedPost, 
    getPosts, 
    getPost, 
    updatePost, 
    deletePost 
} = require('../controllers/post')

const router = Router()

router.post('/posts', createPost)
router.post('/posts/:id', completedPost)
router.get('/posts', getPosts)
router.get('/posts/:id', getPost)
router.put('/posts/:id', updatePost)
router.delete('/posts/:id', deletePost)

module.exports = router
