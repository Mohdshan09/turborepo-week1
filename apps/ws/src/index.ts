import { WebSocketServer } from "ws";
import { client } from "@repo/db/client";

const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (message) => {
        console.log(`Received message: ${message}`);
        // Here you would typically handle the message, such as saving it to a database.
        client.user.create({
            data: {
                username: Math.random().toString(),
                email: `${Math.random().toString()}@example.com`,
                password: Math.random().toString(),
            },
        }).then((user) => {
            ws.send(`User ${user.username} created with ID: ${user.id}`);
        }).catch((error) => {
            console.error("Error creating user:", error);
            ws.send("Error creating user");
        });
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

console.log("WebSocket server is running on ws://localhost:3001"); 
