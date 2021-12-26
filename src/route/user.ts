import {Express} from 'express';
import {createUser,deleteUser,getUsersList, updateUser} from "../controller/user";

export default function(app:Express){

app.post("/create",createUser)
app.get("/userList",getUsersList)
app.put("/updateUser",updateUser)
app.delete("/deleteUser",deleteUser)
}