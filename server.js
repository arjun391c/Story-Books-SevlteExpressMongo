const path = require('path')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const mongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'public/images/'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ '.jpg' )
    }
})

const upload = multer({ storage })

//load config
require('dotenv').config()

//config passport
require('./config/passport')(passport)

connectDB()

const app = express()

//templ engine
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', '.hbs')

//session
app.use(session({
    secret: process.env.CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({ mongooseConnection: mongoose.connection})
}))
//passport middleware
app.use(passport.initialize())
app.use(passport.session())
//middlewares
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//staic folder
app.use(express.static(path.join(__dirname, 'public')))

//global variabel
app.use((req, res, next) => {
    res.locals.user = req.user || null
    next()
})

//routes
// app.use('/api', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/api/stories', upload.single('imageFile'), require('./routes/stories'))

const PORT = process.env.PORT || 5000

if(process.env.NODE_ENV === 'developement' ){
    app.use(morgan('dev'))
} else {
    app.use(express.static(path.join(__dirname, 'client/public')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client/public/index.html'))
    })
}

app.use((req, res) => {
    res.render('404.hbs')
})

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`)
})