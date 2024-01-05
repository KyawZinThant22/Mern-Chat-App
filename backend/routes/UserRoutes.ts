import express from "express"
import { authLogin, getAllUser, registerUser } from "../controller/UserController";

const Router = express.Router();

Router.post("/", registerUser)
Router.get("/", getAllUser)
Router.post("/login", authLogin)


export default Router;