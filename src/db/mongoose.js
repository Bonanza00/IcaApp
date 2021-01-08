const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Ica-App', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
})
