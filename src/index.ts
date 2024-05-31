import express, { Request, Response, Application, NextFunction } from 'express';
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
        'https://fyos.vercel.app',//vercel deployment
        'https://fyos.org',//domain name registra by porkbun
        'https://api.fyos.org'// Heroku deployment
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

app.use((err: Error, req: Request, res: Response, next: NextFunction) =>  {
    console.error('Error: ', err.stack);
    res.status(500).send({ error: 'Something went wrong!', message: err.message })
})

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});