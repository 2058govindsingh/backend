
async function handleFileUpload(req, res) {
    console.log(`Body :`);
    console.log(req.body);
    console.log(`File :`);
    console.log(req.file);

    return res.redirect('/');
}

module.exports = {
    handleFileUpload,
}