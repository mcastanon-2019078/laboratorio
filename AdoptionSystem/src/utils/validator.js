import { hash } from 'bcrypt'

export const encrypt = async(password)=>{
    try{
        return await hash(password, 10)
    }catch(err){
        console.error(err)
        return err
    }
}

export const checkUpdate = (data, userid)=>{
    if(userid){
        if(
            Object.entries(data).length === 0 ||
            data.password ||
            data.password == '' ||
            data.role ||
            data.role == ''
        )return false 
        return true 
        
    }else{
        return false
    }
}