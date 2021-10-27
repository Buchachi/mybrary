//importing mongoose
const mongoose = require('mongoose')

// Creating a Schema - a table in a normale Databse
// Handles data logic
// Interacts with database
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

// Exporting the Schema using a module so we can use CRUD
module.exports = mongoose.model('Author', authorSchema)