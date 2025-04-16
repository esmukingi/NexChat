import express from 'express';
import authRoutes from './routes/auth.route.js'
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser'
import messageRoutes from './routes/message.route.js'
import cors from 'cors';
import {app , server} from './lib/socket.js'
import contactRoute from './routes/contact.route.js'
import path  from 'path';

dotenv.config();
const __dirname = path.resolve();
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb', extended: true}))
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000" || 'http::/localhsost:3001',
    credentials: true
}));
app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes);
app.use('/api/contacts', contactRoute)
const port = process.env.PORT;

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) =>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}
server.listen(port, () =>{
    console.log(`port running on port http://localhost:${port}`);
    connectDB();
})