import express,{Response,Request,NextFunction} from "express";
import connect from "./db/dbConnect";
import routes from "./route/user";
import routeError from "./routeErrorHandel/routeError";
import log from "./logger"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("./client/build")); //make static file to clint build folder

// cors issue
app.use(function (req:Request, res:Response, next:NextFunction) {
    res.header("Access-Control-Allow-Origin", "*"); //all domain request allowed
  
    res.header(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
    ); //all headers allowed
  
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE"); //all method allowed
      return res.status(200).json({});
    }
  
    next();
  })

app.listen(process.env.PORT || 9000,()=>{
    log.info("server started at port 9000");
    // console.log("server started at port 9000");
    connect()  // database connection
    routes(app);
    routeError(app); // error handling middleware
})