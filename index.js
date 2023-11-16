const express = require('express')
const fs = require('fs')
const mongoose = require('mongoose')
const { error } = require('console')

const app = express()
const PORT = 8000

// Create connection
mongoose
  .connect('mongodb://127.0.0.1:27017/youtube-app-1')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Mongo Error : ', err))

// Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    jobTitle: {
      type: String
    },
    gender: {
      type: String
    }
  },
  { timestamps: true }
)

const User = mongoose.model('user', userSchema)
// Middleware
// Log Middleware
app.use((req, res, next) => {
  fs.appendFile(
    'log.txt',
    `\n${Date.now()}: ${req.method} : ${req.path}`,
    err => {}
  )
  next()
})

// req updater Middleware to json format
app.use(express.urlencoded({ extended: false }))

// Routes
app.get('/', (req, res) => res.send('Welcome to my server'))

app.get('/users', async (req, res) => {
  const allDBUsers = await User.find({});
  const html = `
    <ul>
        ${allDBUsers.map(user => `<li> ${user.firstName} - ${user.email} </li>`).join('')}
    </ul>
    `
  return res.send(html)
})

// REST API

// --api/users
app
  .route('/api/users')
  .get(async (req, res) => {
    const allDBUsers = await User.find({});
    res.setHeader('X-MyName', 'Govind Singh') // Custom Header
    return res.json(allDBUsers);
  })
  .post(async (req, res) => {
    const body = req.body
    if (
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.gender ||
      !body.job_title
    ) {
      return res.status(400).json({ msg: 'All fields are required' })
    }
    // MongoDB
    const result = await User.create({
        firstName : body.first_name,
        lastName : body.last_name,
        email : body.email,
        gender : body.gender,
        jobTitle : body.job_title,
    })
    console.log(result);
    return res.status(201).json({msg : "success"});
})

// --api/users/:id
app
  .route('/api/users/:id')
  .get(async (req, res) => {
    // get user data with id
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ error: `No user with ${userID} exists` })
    return res.json(user)
  })
  .patch(async (req, res) => {
    // update user with id
    const body = req.body
    await User.findByIdAndUpdate(req.params.id, body)
    return res.status(200).json({msg : "Updated Successfully"});
  })
  .delete(async (req, res) => {
    // delete user with id
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({msg : "Deleted Successfully"});
  })
app.listen(PORT, () => console.log('Server started at PORT', PORT))
