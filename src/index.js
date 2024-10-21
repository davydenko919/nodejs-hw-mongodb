import { startServer } from './server.js';
import dotenv from "dotenv";
import {initMongoConnection} from './db/initMongoConnection.js';

dotenv.config();

async function bootstrap() {
try {
    await initMongoConnection();
    startServer();
} catch (error) {
    console.error(error);
}
};

bootstrap();
