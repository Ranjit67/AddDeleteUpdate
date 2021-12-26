import {Express, NextFunction, Request, Response} from "express"
import {NotFound} from "http-errors"

export default function(app:Express){
app.use(async(req:Request,res:Response,next:NextFunction)=>{
next(new NotFound())
})
app.use((err:any,req:Request,res:Response,next:NextFunction)=>{
res.status(err.status || 500)
res.json({
    error:{
        message:err.message
    }
})
})
}