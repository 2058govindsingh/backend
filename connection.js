const mongoose = require('mongoose')
mongoose.set("strictQuery", true);
// Create connection
async function connectMongoDB(url) {
    return mongoose.connect(url);
}

module.exports = {
    connectMongoDB,
};