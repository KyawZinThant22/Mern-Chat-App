import express from "express"
import { registerUser } from "../controller/UserController";

const Router = express.Router();

Router.route("/").post(registerUser)


export default Router;