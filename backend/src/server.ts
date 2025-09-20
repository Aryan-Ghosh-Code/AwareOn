import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";

import connecToMongoDB from './db/connectToMongoDB';
import client from './redis/client';
import twilioClient from './services/twilio';
import razorpay from './services/razorpay';
import adminRoutes from './routes/admin.routes';
import progressTrackerRoutes from "./routes/progressTracker.routes";
import { app, server } from './socket/socket';

import userAuthRoutes from './routes/user.routes/auth.routes';
import userProfileRoutes from "./routes/user.routes/profile.routes";
import userProjectRoutes from "./routes/user.routes/project.routes";
import userProblemRoutes from "./routes/user.routes/problem.routes";
import userPaymentRoutes from "./routes/user.routes/payment.routes";
import userReportRoutes from "./routes/user.routes/report.routes";
import userCommentRoutes from "./routes/user.routes/comment.routes";
import userCommunityRoutes from "./routes/user.routes/community.routes";

import ngoAuthRoutes from "./routes/ngo.routes/auth.routes";
import ngoProjectRoutes from "./routes/ngo.routes/project.routes";
import ngoProblemRoutes from "./routes/ngo.routes/problem.routes";
import ngoPaymentRoutes from "./routes/ngo.routes/payment.routes";
import ngoReportRoutes from "./routes/ngo.routes/report.routes";
import ngoCommunityRoutes from "./routes/ngo.routes/community.routes";

import govtAuthRoutes from "./routes/govt.routes/auth.routes";
import govtProjectRoutes from "./routes/govt.routes/project.routes";
import govtProblemRoutes from "./routes/govt.routes/problem.routes";
import govtPaymentRoutes from "./routes/govt.routes/payment.routes";
import govtReportRoutes from "./routes/govt.routes/report.routes";
import govtCommunityRoutes from "./routes/govt.routes/community.routes";

const PORT = process.env.PORT || 3000;

const corsOpts = {
    origin: '*',
    methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE',
        'PATCH',
        'OPTIONS'
    ],
    allowHeaders: [
        'Content-Type',
        'Authorization',
        'Accept'
    ],
    credentials: true
};

app.use(cors(corsOpts));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/api/v1', (req: Request, res: Response) => {
    res.send('Server Up & Running!');
});

// Admin routes
app.use('/api/v1/admin', adminRoutes);

// User routes
app.use('/api/v1/user/auth', userAuthRoutes);
app.use('/api/v1/user/profile', userProfileRoutes);
app.use('/api/v1/user/project', userProjectRoutes);
app.use('/api/v1/user/problem', userProblemRoutes);
app.use('/api/v1/user/payments', userPaymentRoutes);
app.use('/api/v1/user/reports', userReportRoutes);
app.use('/api/v1/user/comments', userCommentRoutes);
app.use('/api/v1/user/community', userCommunityRoutes);

// NGO routes
app.use('/api/v1/ngo/auth', ngoAuthRoutes);
app.use('/api/v1/ngo/project', ngoProjectRoutes);
app.use('/api/v1/ngo/problem', ngoProblemRoutes);
app.use('/api/v1/ngo/payments', ngoPaymentRoutes);
app.use('/api/v1/ngo/reports', ngoReportRoutes);
app.use('/api/v1/ngo/community', ngoCommunityRoutes);

// Govt. routes
app.use('/api/v1/govt/auth', govtAuthRoutes);
app.use('/api/v1/govt/project', govtProjectRoutes);
app.use('/api/v1/govt/problem', govtProblemRoutes);
app.use('/api/v1/govt/payments', govtPaymentRoutes);
app.use('/api/v1/govt/reports', govtReportRoutes);
app.use('/api/v1/govt/community', govtCommunityRoutes);

app.use("/api/v1/progress-tracker", progressTrackerRoutes);

server.listen(PORT, () => {
    console.log(`🚀 Server is running on PORT: ${PORT}`);
    connecToMongoDB();

    if (client) {
        console.log("📦 Connected to Redis");
    } else {
        console.log("❌ Error in connecting to Redis");
    }

    if (twilioClient) {
        console.log("💬 Connected to Twilio");
    } else {
        console.log("❌ Error in connecting to Twilio");
    }

    if (razorpay) {
        console.log("💳 Razorpay Initialized");
    } else {
        console.log("❌ Error in connecting to Razorpay");
    }
});