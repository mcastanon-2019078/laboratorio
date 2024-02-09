import Animal from './animal.model.js'
import { checkUpdate } from '../utils/validator.js'

export const testA = (req, res)=>{
    return res.send('Bienvenido')
}

export const registerAnimal = async(req, res)=>{
    try{
        let data = req.body
        let animal = new Animal (data)
        await animal.save()
        return res.send({message: 'Registered successfully'})
        
    }catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error registering animal', err})
    }
}

export const updatedAnimals = async (req, res)=>{
    try {
        let { nameAnimal } = req.params
        let data = req.body
        let update = checkUpdate(data, nameAnimal)
        if(!update) return res.status(400).send({message: 'Have sumbitted some data that cannot be updated or missing data'})
        let updatedAnimals = await Animal.findOneAndUpdate(
        {_nameAnimal: nameAnimal},
        data,
        {new: true}
        )
        if(!updatedAnimals) return res.status(401).send({message: 'Animal not found and not updated'})
        return res.send({message: 'Updated Animal', updatedAnimals})
    }catch (err) {
        console.error(err)
        if(err.keyValue.nameAnimal) return res.status(400).send({message: 'nameAnimal ${err.keyValue.nameAnimal} is al ready token'})
        return res.status(500).send({message: 'Error updating animal'})
    }
}

export const deleteA = async(req, res)=> {
    try{
        let { nameAnimal } = req.params
        let deleteAnimals = await Animal.findOneAndDelete({_nameAnimal: nameAnimal})
        if(!deleteAnimals) return res.status(404).send({message: 'Animal not found and not deleted'})
        return res.send({message: 'Animal with nameAnimal ${deleteAnimals.nameAnimal} deleted successfully'})
        
    }catch (err) {
        
    }
}