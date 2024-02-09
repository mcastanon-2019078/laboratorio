import User from './user.model.js'
import { checkUpdate, encrypt } from '../utils/validator.js'

export const test = (req, res)=>{
    return res.send('Hello World')
}

export const register = async(req, res)=>{ 
    try{
        let data = req.body
        data.password = await encrypt(data.password)
        data.role = 'CLIENT'
        let user = new User(data)
        await user.save()
        return res.send({message: 'Registered successfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering user', err})
    }
}

export const login = async(req, res)=>{
    try{
       
        let { username, password } = req.body
        let user = await User.findOne({ username }) 
        if(user && await checkPassword(password, user.password)){
            let loggedUser = {
                username: user.username,
                name: user.name,
                role: user.role
        }
        return res.send({message: `Welcome ${user.name}`})
        }
        return res.status(404).send({message: 'Invalid Credentials'})
       
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Failed to login'})
    }
}

export const update = async(req, res)=>{
    try {
        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if(!update ) return res.status(400).send({message: 'Have sumbitted some data that cannot be updated or missing data'})
        let updatedUser = await User.findOneAndUpdate(
         {_id: id}, //ObjectId <- Hexadecimal (HoraSys, version mongo, llave privada)
         data, // Datos que va a actualizar     
         {new: true} //Objeto ya actualizado    
        )
        if(!updatedUser) return res.status(401).send({message: 'User not found and not updated'})
        return res.send({message: 'Updated user', updatedUser})
    } catch(err) {
        console.error(err)
        if(err.keyValue.username) return res.status(400).send({message: 'Username ${err.keyValue.username} is al ready token'})
        return res.status(500).send({message: 'Error udpating account'})
    }
}

export const deleteU = async(req, res)=>{
    try{
        let { id } = req.params
        let deleteUser = await User.findOneAndDelete({_id: id})
        if(!deleteUser) return res.status(404).send({message: 'Account not found and not deleted'})
        return res.send({message: 'Account with username ${deletedUser.username} deleted successfully'})
    } catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting account'})
    }
}