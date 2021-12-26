import mongoose from "mongoose"
export interface User extends mongoose.Document{
    name:string;
    email:string;
    phoneNumber:number;
    counter:number;

}

const userSchema = new mongoose.Schema({
name:{type:String,required:true},
email:{type:String,required:true},
phoneNumber:{type:Number,required:true},
counter:{type:Number,default:0},
})
userSchema.pre('findOneAndUpdate', function (next):void {
    this.update({}, { $inc: { counter: 1 } }); // increment counter by 1 when user is updated

    next();

   
});

const userModule = mongoose.model<User>("User",userSchema)
export default userModule;