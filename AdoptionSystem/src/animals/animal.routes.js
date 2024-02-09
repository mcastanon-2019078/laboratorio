'use strict'

import express from 'express'
import { testA, registerAnimal, updatedAnimals, deleteA } from './animal.controller.js'

const api = express.Router()

api.get('/testA', testA)
api.post('/registerAnimal', registerAnimal)
api.put('/updatedAnimals/:keeper', updatedAnimals)
api.delete('/delete/:keeper', deleteA)
export default api