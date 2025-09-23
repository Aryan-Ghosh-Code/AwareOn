import { Request, Response } from "express";
import Problem from "../../models/problem.model";
import { CommentProps } from "../../types";

export const addComment = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { type, message }: CommentProps = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const  intent = await Problem.findById(id);

        if (!intent) {
            return res.status(400).json({ error: `${type} not found` });
        }

        const newComment = {
            name: req.user?.name || "Anonymous",
            message,
        };

        intent.comments.push(newComment);
        await intent.save();

        res.status(201).json(newComment);
    } catch (error) {
        console.log("Error in User addComment controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};