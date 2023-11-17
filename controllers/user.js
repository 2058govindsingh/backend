const User = require('../models/User')

async function handleGetAllUsers (req, res) {
  const allDBUsers = await User.find({})
  res.setHeader('X-MyName', 'Govind Singh') // Custom Header
  return res.json(allDBUsers)
}

async function handleGetUserById (req, res) {
  const user = await User.findById(req.params.id)
  if (!user)
    return res.status(404).json({ error: `No user with ${userID} exists` })
  return res.json(user)
}
async function handleUpdateUserById (req, res) {
  const body = req.body
  await User.findByIdAndUpdate(req.params.id, body)
  return res.status(200).json({ msg: 'Updated Successfully' })
}
async function handleDeleteUserById (req, res) {
  await User.findByIdAndDelete(req.params.id)
  return res.status(200).json({ msg: 'Deleted Successfully' })
}
async function handleCreateNewUser (req, res) {
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
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title
  })
  console.log(result)
  return res.status(201).json({ msg: 'success', id : result._id})
}
module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleDeleteUserById,
  handleUpdateUserById,
  handleCreateNewUser,
}
