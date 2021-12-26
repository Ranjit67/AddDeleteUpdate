import {Request,Response,NextFunction} from "express"
import userModule from "../model/user"
import {BadRequest,InternalServerError,Conflict} from "http-errors"

 async function createUser(req:Request,res:Response,next:NextFunction){
    try {
        const {name, email, phoneNumber} = req.body;
        if(!name || !email || !phoneNumber) throw new BadRequest("name, email, dob are required");
        const checkEmail = await userModule.findOne({email:email});  // check if email already exist
        if(checkEmail) throw new Conflict("email already exists");
            const userSave  = await userModule.create({name,email,phoneNumber});
            if(!userSave) throw new InternalServerError("user not saved");
            res.json({data:"User created successfully"})
    } catch (error) {
        next(error);
    }


}
async function getUsersList(req:Request,res:Response,next:NextFunction){
    try {
        const users = await userModule.find({});
        res.json({data:users})
        
    } catch (error) {
      next(error);  
    }
}
async function updateUser(req:Request,res:Response,next:NextFunction){
    try {
        const {id} = req.body;
        const _id = id;
        const userDataForUpdate = req.body;
        delete userDataForUpdate.id;
        const userUpdate = await userModule.findOneAndUpdate({_id},userDataForUpdate,{new:true});
        if(!userUpdate) throw new InternalServerError("user not updated");
        res.json({data:"Updated successfully"})
    } catch (error) {
        next(error);
    }
} 

async function deleteUser(req:Request,res:Response,next:NextFunction){
    try {
        const {id} = req.body;
      
        const userDelete = await userModule.findOneAndDelete({_id:id});
        if(!userDelete) throw new InternalServerError("user not deleted");
        res.json({data:"Deleted successfully"})
    } catch (error) {
        next(error);
    }
}

export {
    createUser,
    getUsersList,
    updateUser,
    deleteUser
}