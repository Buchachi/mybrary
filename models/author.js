//importing mongoose
const mongoose = require('mongoose')
const Book = require('./book')
// Creating a Schema - a table in a normale Databse
// Handles data logic
// Interacts with database
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

authorSchema.pre('remove', function (next) {
    Book.find({ author: this.id }, (err, books) => {
        if (err) {
            next(err)
        } else if (books.length > 0) {
            next(new Error('This author has books still'))
        } else {
            next()
        }
    })
})

// Exporting the Schema using a module so we can use CRUD
module.exports = mongoose.model('Author', authorSchema)