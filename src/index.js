const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const handlebars = require('express-handlebars')
const mainRouter = require('./routers/main')

require('./db/mongoose')

const app = express()
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../views/layouts')

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutsDir: viewsPath,
    extname: 'hbs'
}));

// sets settings for server
app.use(express.static(publicDirectory))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

//uses routers
app.use(mainRouter)

app.listen(3000, () => {
    console.log('Server is up on Port 3000')
})