const express = require('express')
const { handleGetAllUsers , handleCreateNewUser , handleGetUserById, handleDeleteUserById, handleUpdateUserById} = require("../controllers/user");
const router = express.Router();

  // RESTful APIs
  
  router
    .route('/')
    .get(handleGetAllUsers)
    .post(handleCreateNewUser)

  // --:id
  router
    .route('/:id')
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById)
  
module.exports = router 