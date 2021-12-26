
import mongoose from "mongoose";
function connect() {
    mongoose.connect("mongodb+srv://RANJIT_5:IAohmIgq3ZDj5rBX@cluster0.b5vz0.mongodb.net/TaskDB?retryWrites=true&w=majority").then(()=>{
       console.log("DB Connected")
    })
    .catch(err=>{
        console.error(err)
    })
}
export default connect;