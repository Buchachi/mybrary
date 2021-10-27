if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express'); //importing express library that i installed via NPM
const app = express(); // getting the app portion by calling this function of express
const expressLayouts = require('express-ejs-layouts'); // getting the express layouts package that i installed


const indexRouter = require('./routes/index')//reference to the index router inside the require

// configuring the express application
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')//hooking express layout
app.use(expressLayouts)
app.use(express.static('public')) //telling where my public files will be - stylsheets, javascript of my images


const mongoose = require('mongoose') // importing mongoose
//Connecting Mongoose to my database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))


app.use('/', indexRouter)// telling the route path of the application and tell what route we want to handle with that route


// telling my app to listen on a certain port
app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port 3000")
})
