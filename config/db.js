let mongoose = require("mongoose")

let URL = "mongodb://127.0.0.1:27017/Library"

// connecting to the DB
let connection = mongoose.connect(URL)

// exporting the module
module.exports = connection

