import mongoose from 'mongoose';
import { env } from '../utils/env.js';

const DB_URI = String(env('MONGODB_URLMYOWN'));

async function initMongoConnection(){
    try {
        await mongoose.connect(DB_URI);

        console.log("Mongo connection successfully established!");
    }
    catch(error){
            console.error(error);
            throw error;
    }
};

export{initMongoConnection};

