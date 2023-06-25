const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    title:{
        type: String, 
        required: true
    },
    author:{
        type: String,
        required: true
    },
    status:{
        type: String, 
        required: true
    },
    score:{
        type: Number,
        minimum: 1,
        maximum: 5
    },
    reviews:{
        type: String
    },
    imgUrl: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Référence au modèle d'utilisateur
        required: true
    }
})



module.exports =mongoose.model('Book', bookSchema)