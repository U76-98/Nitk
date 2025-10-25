import express from "express"
import dotenv from "dotenv"
import bodyParser from 'body-parser';
import {createProfile } from "./controllers/citizen.js"
import {uploadItem} from "./controllers/greenchamp.js"
import {createTest} from "./controllers/test.js"
import { createCollectionSchedule } from "./controllers/collection.js";
import {uploadTrashReport, upload} from "./controllers/trashupload.js";
import { uploadMarketItem, take } from "./controllers/market.js";
import {addActivity} from "./controllers/status.js"


dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const PORT=process.env.PORT;

app.post('/api/citizen', createProfile);
app.post('/api/test', createTest)
app.post('/api/collection', createCollectionSchedule);
app.post('/api/complain' , upload.single("photo"), uploadTrashReport);
app.post('/api/market' , take.single("photo"), uploadMarketItem);
app.post('/api/activity', addActivity);


app.listen(PORT, () => console.log("Server running on http://localhost:3000"));
