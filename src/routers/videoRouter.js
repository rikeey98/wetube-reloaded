import express from "express";
import {watch, getEdit, postEdit, getUpload, postUpload, deleteVideo} from "../controllers/videoController";

const videoRouter = express.Router();

// videoRouter.get("/upload", upload);
videoRouter.get("/:id([0-9a-f]{24})", watch);
// 두개 이상의 html method를 사용하는 경우는 아래와 같이 route를 사용한다.
// videoRouter.route("/:id(\\d+)").get(watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").get(deleteVideo);
// videoRouter.get("/:id(\\d+)/edit", getEdit);
// videoRouter.post("/:id(\\d+)/edit", postEdit);
// videoRouter.get("/:id(\\d+)/remove", removeVideo);
videoRouter.route("/upload").get(getUpload).post(postUpload);

export default videoRouter;