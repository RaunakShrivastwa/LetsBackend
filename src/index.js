import express from 'express';
import dotenv from 'dotenv';
import DB from './config/DB_Config/MongoDBConfig.js';
import MainRouter from './router/mainRouter.js';
import cloudinaryConfig from './config/Cloudinary/cloudinary.js';
import { LocalStorage } from "node-localstorage";
import cors from 'cors'
const localStorage = new LocalStorage("./scratch");

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors('*'))
app.use(cloudinaryConfig)
app.use('/letswork', MainRouter);

app.listen(PORT, () => {
    console.log(`Server Started At Port ${PORT}`);
})