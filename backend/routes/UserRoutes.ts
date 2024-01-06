import express from "express"
import { authLogin, getAllUser, getMe, registerUser } from "../controller/UserController";
import { protect } from "../middleware/authMiddleware";

const Router = express.Router();

Router.post("/", registerUser)
Router.get("/", protect, getAllUser)
Router.post("/login", authLogin)
Router.get("/me", protect , getMe)


export default Router;