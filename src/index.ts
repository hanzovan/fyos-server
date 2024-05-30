import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import compression from 'compression';
import { postRouter } from './routes';
import { connectDb } from './db';

// For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5001;

// Add for client site rendering
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'https://fyos.vercel.app',
        'https://fyos.org'
    ],
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/", postRouter)

// connect db
connectDb();

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to fyos server');
});

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});