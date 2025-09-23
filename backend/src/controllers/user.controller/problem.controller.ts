import { Request, Response } from "express";
import { ModelResult, PostProblemProps } from "../../types";
import Problem from "../../models/problem.model";
import User from "../../models/user.model";
import getGeocodedAddress from "../../utils/getGeocodedAddress";
import Project from "../../models/project.model";
import twilioClient from "../../services/twilio";
import NGO from "../../models/ngo.model";

export const postProblem = async (req: Request, res: Response) => {
    try {
        const id = req.user?._id;
        const {
            url,
            description,
            lat,
            lon
        }: PostProblemProps = req.body;

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

        /*const response = await fetch(`${process.env.MODEL_URL}/predict`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                imgUrl: url,
                description: description || "Climate & Biodiversity Hazard"
            })
        });

        const modelResult = await response.json() as ModelResult;

        if (!modelResult) {
            res.status(400).json({ error: "Error in uploading Problem. Try again later" });
            return;
        }*/

        const newProblem = new Problem({
            owner: id,
            url,
            location: {
                lat,
                lon,
                address
            },
            problem: "Stagnant Water",
            ministry: "Municipal Health Department",
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

        if (newProblem) {
            const user = await User.findById(id);
            if (!user) {
                res.status(400).json({ error: "Cannot find user" });
                return;
            }
            user.problemRepoIds.push(newProblem._id);

            await Promise.all([newProblem.save(), user.save()]);

            /*const ngos = await NGO.find({
                SDG: { $in: newProblem.SDG }
            });

            for (const ngo of ngos) {
                if (ngo && ngo.mobileNo) {
                    const message = `🚨 SOS Alert: ${newProblem.problem} - ${address}`;

                    const sms = await twilioClient.messages.create({
                        body: message,
                        from: process.env.TWILIO_PHONE_NUMBER,
                        to: `+91${ngo.mobileNo}`,
                        messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID
                    });
                }
            }*/

            res.status(201).json(newProblem);
        } else {
            res.status(400).json({ error: "Error in posting Problem" });
        }
    } catch (error) {
        console.log("Error in User postProblem controller", error);
        res.status(500).json({ error: "Internal Server Error" });
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