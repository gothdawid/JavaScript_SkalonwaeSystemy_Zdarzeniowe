var mongoose = require("mongoose");

const AuthorSchema = require.main.require('./app/models/Author')
const BookSchema = require.main.require('./app/models/Book')

const db = require('./db.config')

mongoose.connect(`mongodb://${db.host}/${db.name}`, db.opts)

mongoose.connection.on('connected', () => {
    console.log(`Mongoose default connection open to ${db.host}/${db.name}`)
    mongoose.model('Author', AuthorSchema)
    mongoose.model('Book', BookSchema)
})