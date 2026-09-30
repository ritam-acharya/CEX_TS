import express from "express";
import dotenv from "dotenv";


dotenv.config();
const app = express();

app.get("/", (req, res) => {
    res.status(200).send("Welcome here !");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("app is running on port ", PORT);
});