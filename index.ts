import express from "express";
import type { Response, Request } from "express";
import dotenv from "dotenv";
import { users } from "./constants";
import { signup } from "./controllers/signup";
import { signin } from "./controllers/singin";
import { auth } from "./middlewares/auth";


dotenv.config();
const app = express();
app.use(express.json());


app.get("/health", (req, res) => {
    res.status(200).send("Server is alive");
});


app.post("/signup", async (req: Request, res: Response) => {
    signup(req, res, users);
});



app.post("/signin", async (req: Request, res: Response) => {
    signin(req, res, users);
});


app.get("/random", auth, (req, res) => {
    res.status(200).json({
        message: "welcome"
    });
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("app is running on port ", PORT);
});