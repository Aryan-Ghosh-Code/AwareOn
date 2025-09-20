import { Request, Response } from "express";
import Project from "../../models/project.model";
import Problem from "../../models/problem.model";
import { CommentProps } from "../../types";

export const addComment = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { type, message }: CommentProps = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        let intent;
        if (type === "Project") {
            intent = await Project.findById(id);
        } else if (type === "Problem") {
            intent = await Problem.findById(id);
        } else {
            return res.status(400).json({ error: "Invalid type. Must be Project or Problem" });
        }

        if (!intent) {
            return res.status(404).json({ error: `${type} not found` });
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