
function handleDiskStorageDestination(req, file, cb) {
    //cb(error, folder)
    cb(null, './uploads');
}

function handleDiskStorageFilename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
}

module.exports = {
    handleDiskStorageDestination,
    handleDiskStorageFilename,
}