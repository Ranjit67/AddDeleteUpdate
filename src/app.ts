import express,{Response,Request,NextFunction} from "express";
import connect from "./db/dbConnect";
import routes from "./route/user";
import routeError from "./routeErrorHandel/routeError";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("./client/build"));

// cors issue
app.use(function (req:Request, res:Response, next:NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
  
    res.header(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
    );
  
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
      return res.status(200).json({});
    }
  
    next();
  })

app.listen(process.env.PORT || 9000,()=>{
    console.log("server started at port 9000");
    connect()
    routes(app);
    routeError(app);
})