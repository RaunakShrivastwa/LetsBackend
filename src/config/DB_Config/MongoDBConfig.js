import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect('mongodb+srv://canTech:220831@cantechnology.v9rfpa6.mongodb.net/letswork');
const DB = mongoose.connection;

DB.on('error', (err) => console.log(`There is Error IN DB ${err}`));
DB.on('open', () => console.log('DB connected'));

export default DB;
