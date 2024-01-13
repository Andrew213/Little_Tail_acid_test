import express from 'express';
import authRouter from './routes/auth.routes.js';
import specRouter from './routes/spec.routes.js';
import petRouter from './routes/pet.routes.js';
import therapyRouter from './routes/therapy.routes.js';
import todayRouter from './routes/today.routes.js';
// import config from 'config';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api', specRouter);
app.use('/api', petRouter);
app.use('/api', therapyRouter);
app.use('/api', todayRouter);

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION);

        app.listen(5000, () => {
            console.log('server started on ', 5000);
        });
    } catch (e) {
        console.log(`error `, e);
    }
};

void start();
