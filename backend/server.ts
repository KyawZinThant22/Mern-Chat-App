import  express  from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cors from "cors";


import UserRoute from "./routes/UserRoutes"
import { errorHandler, notFound } from "./middleware/ErrorHandler";

dotenv.config();
connectDB();
const app = express();
app.use(cors())

const port = process.env.PORT || 8000;
app.use(express.json())

app.use("/api/user",UserRoute)
app.use(notFound)
app.use(errorHandler)
app.listen(port, () => {
  console.log(`Server is running and listening to port ${port}`);
});
