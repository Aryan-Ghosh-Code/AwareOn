import { Request, Response } from "express";
import Problem from "../../models/problem.model";
import { Types } from "mongoose";

export const viewProblems = async (req: Request, res: Response) => {
    try {
        const problems = await Problem.find({
            GovtWorking: { $ne: req.govt?._id }
        });

        if (!problems) {
            res.status(400).json({ error: "Error in fetching problems" })
        } else {
            res.status(200).json(problems.reverse());
        }
    } catch (error) {
        console.log("Error in Govt. viewMyProblems controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const viewProblemById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const problem = await Problem.findById(id)
            .populate({
                path: "owner",
                select: "name profilePic email"
            })
            .populate({
                path: "NGOWorking",
                select: "name profilePic email"
            })
            .populate({
                path: "GovtWorking",
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

        if (!problem) {
            res.status(400).json({ error: "Error in fetching problem data" })
        } else {
            res.status(200).json(problem);
        }
    } catch (error) {
        console.log("Error in Govt. viewProblemById controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const pickAProblem = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const problem = await Problem.findById(id);
        if (!problem) {
            res.status(400).json({ error: "Error in fetching problem data" });
            return;
        }

        if (req.govt?._id) {
            const govtId = req.govt._id;
            if (problem.GovtWorking.some((id: Types.ObjectId) => id.equals(govtId))) {
                res.status(400).json({ error: "Govt. Body has already picked up this problem" });
                return
            }

            problem.GovtWorking.push(govtId);
            problem.statusForGovt = "ongoing";
            await problem.save();

            res.status(200).json(problem);
        } else {
            res.status(400).json({ error: "Error in Picking up the Problen" });
        }
    } catch (error) {
        console.log("Error in Govt. pickAProblem controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}