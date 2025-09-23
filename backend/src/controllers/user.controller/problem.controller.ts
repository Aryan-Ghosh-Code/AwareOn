import { Request, Response } from "express";
import { ModelResult, PostProblemProps } from "../../types";
import Problem from "../../models/problem.model";
import User from "../../models/user.model";
import getGeocodedAddress from "../../utils/getGeocodedAddress";
import notifyGovernment from "../../utils/notifyGovernment";
import extractTownCity from "../../utils/extractTownCity";

export const postProblem = async (req: Request, res: Response) => {
    try {
        const id = req.user?._id;
        const { url, description, lat, lon }: PostProblemProps = req.body;

        if (!url) {
            res.status(400).json({ error: "Image is required" });
            return;
        }
        if (!lat || !lon) {
            res.status(400).json({ error: "Error in fetching your location" });
            return;
        }
        const address = await getGeocodedAddress(lat, lon);
        if (!address) {
            res.status(400).json({ error: "Error in fetching your location" });
            return;
        }

        /*
        const response = await fetch(`${process.env.MODEL_URL}/predict`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imgUrl: url,
            description: description || "Climate & Biodiversity Hazard"
          })
        });
        const modelResult = await response.json() as ModelResult;
        if (!modelResult)
          return res.status(400).json({ error: "Error in uploading Problem. Try again later" });
        */

        const predictedProblem = "Stagnant Water";
        const ministry = "Municipal Health Department";

        const { town, city } = extractTownCity(address);

        const existingProblem = await Problem.findOne({
            problem: predictedProblem,
            "location.lat": lat,
            "location.lon": lon
        });

        if (existingProblem) {
            existingProblem.upvotes += 1;

            // HARD_LIMIT = 5
            if (existingProblem.upvotes >= 5) {
                existingProblem.problemStatus = "verified";

                await notifyGovernment(
                    ministry,
                    town,
                    city,
                    existingProblem.problem,
                    existingProblem.location!.address
                );
            }

            await existingProblem.save();
            return res.status(200).json(existingProblem);
        }

        const newProblem = new Problem({
            owner: id,
            url,
            location: {
                lat,
                lon,
                address,
                town,
                city
            },
            problem: predictedProblem,
            ministry,
            description,
            alertLevel: "high",
            confidence: 0.9873,
            actionableInsights: [
                "Spray larvicides",
                "Clear clogged drains",
                "Promote citizen cleanliness drives"
            ],
            shortTermImpacts: [
                "Mosquito growth",
                "Dengue and malaria outbreaks",
                "Unhygienic living conditions"
            ],
            longTermImpacts: [
                "Chronic public health challenges",
                "Increased healthcare costs",
                "Reduced urban livability"
            ]
        });

        const user = await User.findById(id);
        if (!user) return res.status(400).json({ error: "Cannot find user" });

        user.problemRepoIds.push(newProblem._id);
        await Promise.all([newProblem.save(), user.save()]);

        res.status(201).json(newProblem);
    } catch (error) {
        console.log("Error in User postProblem controller", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const viewMyProblems = async (req: Request, res: Response) => {
    try {
        const problems = await Problem.find({ owner: req.user?._id });

        if (!problems) {
            res.status(400).json({ error: "Error in fetching problems" })
        } else {
            res.status(200).json(problems.reverse());
        }
    } catch (error) {
        console.log("Error in User viewMyProblems controller", error);
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
        console.log("Error in User viewProblemById controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const viewProblems = async (req: Request, res: Response) => {
    try {
        const problems = await Problem.find({
            owner: { $ne: req.user?._id }
        });

        if (!problems) {
            res.status(400).json({ error: "Error in fetching problems" })
        } else {
            res.status(200).json(problems.reverse());
        }
    } catch (error) {
        console.log("Error in User viewProblems controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const upvoteProblemById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const problem = await Problem.findById(id);
        if (!problem) {
            return res.status(400).json({ error: "Error in fetching problems" });
        }

        problem.upvotes += 1;

        // HARD_LIMIT = 5
        if (problem.upvotes >= 5 && problem.problemStatus !== "verified") {
            problem.problemStatus = "verified";
            const { town, city } = extractTownCity(problem.location!.address);

            await notifyGovernment(
                problem.ministry,
                town,
                city,
                problem.problem,
                problem.location!.address
            );
        }

        await problem.save();
        return res.status(200).json(problem);
    } catch (error) {
        console.error("Error in User upvoteProblemById controller", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};