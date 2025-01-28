import express from "express";
import morgan from "./config/morgan.js"
import compression from "compression"
import cors from "cors"
import helmet from "helmet"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"
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
app.use(express.static("public"));



export default app;

