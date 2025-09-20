import { Request, Response } from "express";
import Project from "../../models/project.model";

export const getProjects = async (req: Request, res: Response) => {
    try {
        const projects = await Project.find()
            .populate({
                path: "owner",
                select: "name",
            });

        if (projects) {
            res.status(200).json(projects.reverse());
        } else {
            res.status(400).json({ error: "Error in fetching Projects from Repository" });
        }
    } catch (error) {
        console.log("Error in User getProjects controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getProjectById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const project = await Project.findById(id)
            .populate({
                path: "owner",
                select: "name profilePic email"
            })
            .populate({
                path: "reports",
                populate: {
                    path: "reporter",
                    select: "name"
                },
                select: "reporterModel timeline"
            });

        if (project) {
            res.status(200).json(project);
        } else {
            res.status(400).json({ error: "Error in fetching Project from Repository" });
        }
    } catch (error) {
        console.log("Error in User getProjectById controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}