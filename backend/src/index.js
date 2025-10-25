import express from "express"
import dotenv from "dotenv"
import bodyParser from 'body-parser';
import {createCitizen } from "./controllers/citizen.js"
import {uploadItem} from "./controllers/greenchamp.js"


dotenv.config();
const app = express();
app.use(bodyParser.json());
const PORT=process.env.PORT;

app.post('/api/citizen', createCitizen);

app.post("/api/market", uploadItem);


app.listen(PORT, () => console.log("Server running on http://localhost:3000"));
