import  express  from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";

import UserRoute from "./routes/UserRoutes"

dotenv.config();
connectDB();
const app = express();

const port = process.env.PORT || 8000;
app.use(express.json())

app.use("/api/user",UserRoute)

app.listen(port, () => {
  console.log(`Server is running and listening to port ${port}`);
});
