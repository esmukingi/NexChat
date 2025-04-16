import express from 'express';
import authRoutes from './routes/auth.route.js';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/message.route.js';
import cors from 'cors';
import { app, server } from './lib/socket.js';
import contactRoute from './routes/contact.route.js';
import path from 'path';

dotenv.config();
const __dirname = path.resolve();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : ["http://localhost:3000", "http://localhost:3001"],
    credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/contacts', contactRoute);

// Log all routes safely
console.log('Registered routes:');
app._router?.stack?.forEach((r) => {
    if (r.route && r.route.path) {
        console.log(`Route: ${r.route.path} [Methods: ${Object.keys(r.route.methods).join(', ').toUpperCase()}]`);
    } else if (r.name === 'router' && r.handle && Array.isArray(r.handle.stack)) {
        r.handle.stack.forEach((handler) => {
            if (handler.route && handler.route.path) {
                console.log(`Route: ${handler.route.path} [Methods: ${Object.keys(handler.route.methods).join(', ').toUpperCase()}]`);
            }
        });
    }
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
    connectDB();
});
