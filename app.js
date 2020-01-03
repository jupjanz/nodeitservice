const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv/config')
const postsRouter = require('./routes/posts')
const usersRouter = require('./routes/users')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 5000

const routers = ([postsRouter,usersRouter])

//middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api',routers)
// app.use(usersRouter)


//Routes


//connect to db
const mongdb = 'mongodb+srv://itservice:1234@project1-jlxnr.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(process.env.DB_CONNECTION ,{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to mongodb')
})


app.listen(port,() => {
    console.log('start node port 3001')
})