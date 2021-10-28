//importing mongoose
const mongoose = require('mongoose');

// Creating a Schema - a table in a normale Databse
// Handles data logic
// Interacts with database
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    publishDate: {
        type: Date,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    coverImage: {
        type: Buffer,
        required: true
    },
    coverImageType: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    }
})

// Allow me to create a virtual property that will act as the same as the variables i have on the book but it will derive its value from these variables
bookSchema.virtual('coverImagePath').get(function () {
    if (this.coverImage != null && this.coverImageType != null) {
        return `data:${this.coverImageType};charset-utf-8;base64,${this.coverImage.toString('base64')}`
    }
})

// Exporting the Schema using a module so we can use CRUD
module.exports = mongoose.model('Book', bookSchema)
