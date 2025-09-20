import { Request, Response } from "express";
import { ProjectCreationProps } from "../../types";
import Project from "../../models/project.model";
import NGO from "../../models/ngo.model";
import Problem from "../../models/problem.model";

export const createProject = async (req: Request, res: Response) => {
    try {
        const id = req.ngo?._id;
        const {
            name,
            city,
            state,
            startDate,
            endDate,
            SDG,
            aim,
            description,
            objectives,
            target,
            tariff
        }: ProjectCreationProps = req.body;

        if (!city) {
            res.status(400).json({ error: "City is required" });
            return;
        }
        if (!state) {
            res.status(400).json({ error: "State is required" });
            return;
        }
        if (SDG.length < 1) {
            res.status(400).json({ error: "Alignment with atleast 1 SDG is required" });
            return;
        }
        if (!aim) {
            res.status(400).json({ error: "Project aim is required" });
            return;
        }
        if (!description) {
            res.status(400).json({ error: "Project description is required" });
            return;
        }
        if (objectives.length < 1) {
            res.status(400).json({ error: "Atleast 1 Project objective is required" });
            return;
        }
        if (tariff.length < 1) {
            res.status(400).json({ error: "Atleast 1 Tariff Plan is required" });
            return;
        }
        if (!startDate || !endDate) {
            res.status(400).json({ error: "Timeline is required" });
            return;
        }
        if (target < 0) {
            res.status(400).json({ error: "Valid target is required" });
            return;
        }

        const newProject = new Project({
            owner: id,
            ownerModel: "NGO",
            name,
            location: {
                city,
                state
            },
            timeline: {
                startDate,
                endDate
            },
            SDG,
            aim,
            description,
            objectives,
            target,
            tariff
        });

        if (newProject) {
            const ngo = await NGO.findById(id);
            if (!ngo) {
                res.status(400).json({ error: "Cannot find NGO" });
                return;
            }
            ngo.projectRepoIds.push(newProject._id);

            await Promise.all([newProject.save(), ngo.save()]);
            res.status(201).json(newProject);
        } else {
            res.status(400).json({ error: "Error in creating Project" });
        }
    } catch (error) {
        console.log("Error in NGO createProject controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getProjects = async (req: Request, res: Response) => {
    try {
        const ngo = await NGO.findById(req.ngo?._id);
        if (!ngo) {
            res.status(400).json({ error: "Cannot find NGO Data" });
            return;
        }

        const projects = await Project.find({
            _id: { $nin: ngo.projectRepoIds }
        }).populate({
            path: "owner",
            select: "name",
        });

        if (projects) {
            res.status(200).json(projects.reverse());
        } else {
            res.status(400).json({ error: "Error in fetching Projects from Repository" });
        }
    } catch (error) {
        console.log("Error in NGO getProjects controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getMyProjects = async (req: Request, res: Response) => {
    try {
        const ngo = await NGO.findById(req.ngo?._id);
        if (!ngo) {
            res.status(400).json({ error: "Cannot find NGO Data" });
            return;
        }

        const projects = await Project.find({
            _id: { $in: ngo.projectRepoIds }
        }).populate({
            path: "owner",
            select: "name",
        });

        if (projects) {
            res.status(200).json(projects.reverse());
        } else {
            res.status(400).json({ error: "Error in fetching Projects from Repository" });
        }
    } catch (error) {
        console.log("Error in NGO getMyProjects controller", error);
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
        console.log("Error in NGO getProjectById controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getSuggestions = async (req: Request, res: Response) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findById(projectId);
        if (!project) {
            res.status(400).json({ error: "Project not found" });
            return;
        }
        const projectSDGs = project.SDG;

        const relatedProblems = await Problem.find({
            SDG: { $in: projectSDGs.map((sdg: string) => sdg.split(".")[0]) }
        });

        res.json(relatedProblems.reverse());
    } catch (error) {
        console.log("Error in NGO getSuggestions controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}