import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [process.env.BASE_URL!],
        methods: ["GET", "POST", "PATCH", "DELETE"]
    }
});

const userSocketMap: { [userId: string]: string } = {};

const tierUserMap: { [tierId: string]: Set<string> } = {};

export const getReceiverSocketId = (receiverId: string) => {
    return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
    console.log("User Connected", socket.id);

    const userId = socket.handshake.query.userId;

    if (typeof userId === "string" && userId !== "undefined") {
        userSocketMap[userId] = socket.id;

        socket.on("join-group", (tierId: string) => {
            socket.join(tierId);
            console.log(`User ${userId} joined group ${tierId}`);

            if (!tierUserMap[tierId]) tierUserMap[tierId] = new Set();
            tierUserMap[tierId].add(userId);

            socket.to(tierId).emit("receive-message", `${userId} joined the group`);
        });


        socket.on("disconnect", () => {
            console.log("User disconnected", socket.id);
            delete userSocketMap[userId];

            for (const tierId in tierUserMap) {
                tierUserMap[tierId].delete(userId);
                if (tierUserMap[tierId].size === 0) {
                    delete tierUserMap[tierId];
                }
            }
        });
    }
});

export { app, io, server };