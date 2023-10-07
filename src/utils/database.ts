 import mongoose from "mongoose";
 import config from "config";
 import logger from './logger';

 export default async function connectDB(){
   const dbURI = config.get<string>('MONGODB_URI');
    try {
        await mongoose.connect(dbURI)
        logger.info('Connected to MongoDB')
    } catch (error) {
        logger.error("Couldnt connect to db");
        process.exit(1);
    }
   
}
 