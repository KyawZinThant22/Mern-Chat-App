import express from "express"
import { authLogin, registerUser } from "../controller/UserController";

const Router = express.Router();

Router.post("/", registerUser)
Router.post("/login", authLogin)


export default Router;