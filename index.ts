import express from "express";
import type { Response, Request } from "express";
import dotenv from "dotenv";
import { users } from "./constants";
import { signup } from "./controllers/signup";


dotenv.config();
const app = express();
app.use(express.json());


app.get("/health", (req, res) => {
    res.status(200).send("Server is alive");
});


app.post("/signup", async (req: Request, res: Response) => {
    signup(req, res, users);
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("app is running on port ", PORT);
});