import express from "express";
import compression from "compression"
import cors from "cors"
import helmet from "helmet"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"
import morgan from "./config/morgan.js"
import errorHandler from "./middlewares/errorhandler.js";
import routes from "./routes/index.js";
const app = express();


const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

app.use(morgan);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(cookieParser());

//routing 
app.use("/api/v1",routes)
app.use(express.static("public"));

app.use(errorHandler);



export default app;

