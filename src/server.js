import express from "express";
import { process_params } from "express/lib/router";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

// create app
const app = express();
const logger = morgan("combined");
// config app

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src" + "/views");

app.use(logger);

// for express understand bodies structure (when using post)
app.use(express.urlencoded({extended: true}));

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;