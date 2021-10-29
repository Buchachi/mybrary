if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
// Calling all the required packages

const express = require('express'); //importing express library that i installed via NPM
const app = express(); // getting the app portion by calling this function of express
const expressLayouts = require('express-ejs-layouts'); // getting the express layouts package that i installed
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// Reference/Requiring Routers

const indexRouter = require('./routes/index')//reference to the index router inside the require
const authorRouter = require('./routes/authors')//reference to the author router inside the require
const bookRouter = require('./routes/books')

// configuring the express application
// Configurations for setting up ejs engine & displaying static files from "public" folder
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')//hooking express layout
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public')) //telling where my public files will be - stylsheets, javascript of my images

// Configurations for "body-parser"

app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const mongoose = require('mongoose') // importing mongoose
//Connecting Mongoose to my database, sending an error when no connection or a response when i have connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

// Using Routers
app.use('/', indexRouter)// telling the route path of the application and tell what route we want to handle with that route
app.use('/authors', authorRouter) // telling the authors path of the application and tell what route we want to handle with that route
app.use('/books', bookRouter)

// telling my app to listen on a certain port
app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port 3000")
})
