import express from "express";
import { client } from "@repo/db/client";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    const user = await client.user.create({
        data: {
            username,
            email,
            password,
        },
    })


    // Here you would typically handle the signup logic, such as saving the user to a database.
    res.status(201).json({
        message: "User signed up successfully",
        id: user.id,
    });
});

app.get("/users", async (req, res) => {
    const users = await client.user.findMany();
    res.json(users);
});