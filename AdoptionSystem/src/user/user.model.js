import mongoose from 'mongoose';

const animalSchema = mongoose.Schema({
    keeper: {
        type: String,
        required: true
    },
    
    nameAnimal: {
        type: String,
        required: true
    },

    razaAnimal: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    size: {
        type: String,
        required: true
    }


    })

export default mongoose.model('animal', animalSchema)