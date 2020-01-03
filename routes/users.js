const express = require('express')
const router = express.Router()
const User = require('../models/users')
const Joi = require('@hapi/joi')

router.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        console.log(error)
    }
})

router.post('/users/register', async (req, res) => {
    const schema = Joi.object({
        username : Joi.string().min(6).max(255).required(),
        email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password : Joi.string().min(6).max(255).required()
    })
       
    try {
        const {error} = await schema.validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        const usernameExist = await User.findOne({username : req.body.username})
        if(usernameExist) return res.status(400).send('username already exists')

        const emailExist = await User.findOne({email : req.body.email})
        if(emailExist) return res.status(400).send('email already exists')

        const users = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
    
        const saveUser = await users.save()
        res.json(saveUser)
    } catch (error) {
        console.log(error)
    }
})


router.delete('/users/:id', async (req, res) => {
    try {
        const users = await User.remove({ _id: req.params.id })
        res.json(users)
    } catch (error) {
        res.json(error)
    }
})



module.exports = router