const express = require('express')
const router = express.Router()
const Post = require('../models/posts')


router.get('/', (req, res) => {
    res.send('we are on home')
})

router.get('/posts', async (req, res) => {
    try {
        const post = await Post.find()
        res.json(post)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
})

router.post('/posts', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
    })
    try {
        const savedPost = await post.save();
        res.json(savedPost)
    } catch (err) {
        res.json({ message: err }) 
    }
})

router.get('/posts/:id', async (req, res) => {
    const { id } = req.params
    try {
        const post = await Post.findById({ _id: id })
        res.json(post)
    } catch (error) {
        res.json(error)
    }
})


router.patch('/posts/:id', async (req, res) => {
    // const payload = req.body
    const { id } = req.params
    try {
        const post = await Post.updateOne({ _id: id },{$set : {title : req.body.title,description: req.body.description}})
        const findPost = await Post.findById({_id : id})
        res.json(findPost)
    } catch (error) {
        res.json(error)
    }
})


router.delete('/posts/:id',async (req,res) => {
    const {id} = req.params
    try {
        const post = await Post.remove({_id : id})
        const findPost = await Post.find()
        res.json(findPost)
    } catch (error) {
        res.json(error)
    }
})

module.exports = router