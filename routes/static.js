const express = require('express');
const {handleFileUpload} = require('../controllers/static')
const {handleDiskStorageDestination, handleDiskStorageFilename} = require('../controllers/storage')
const router = express.Router();
const multer = require('multer')

const storage = multer.diskStorage({
    destination: handleDiskStorageDestination,
    filename: handleDiskStorageFilename
})

const upload = multer({storage: storage})
// upload.fields([{name : file1}, {name : file2}])
router.post('/upload', upload.single("profileImage"), handleFileUpload)

router.get('/', (req, res) => {
    res.render('home');
});

module.exports = router;