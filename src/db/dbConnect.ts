
import mongoose from "mongoose";
import log from "../logger"
function connect() {
    mongoose.connect("mongodb+srv://RANJIT_5:IAohmIgq3ZDj5rBX@cluster0.b5vz0.mongodb.net/TaskDB?retryWrites=true&w=majority").then(()=>{
       log.info("DB Connected")
    })
    .catch(err=>{
        console.error(err)
    })
}
export default connect;