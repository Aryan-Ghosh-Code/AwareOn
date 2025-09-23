import { Request, Response } from "express";
import Govt from "../../models/govt.model";
import { OnboardingMinistryProps } from "../../types";

export const onboardMinistry = async (req: Request, res: Response) => {
    try {
        const {
            name,
            contact
        }: OnboardingMinistryProps = req.body;
        if (!name || !contact) {
            res.status(400).json({ error: "All details are required" });
            return;
        }

        const govt = await Govt.findById(req.govt?._id);
        if (!govt) {
            res.status(400).json({ error: "Cannot find Government Body" });
            return;
        }

        const newDepartment = {
            name,
            contact
        }
        govt.departments.push(newDepartment);
        await govt.save();

        res.status(200).json(govt.departments);
    } catch (error) {
        console.error("Error in onboardMinistry controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getMyMinistries = async (req: Request, res: Response) => {
    try {
        const govt = await Govt.findById(req.govt?._id);
        if (!govt) {
            res.status(400).json({ error: "Cannot find Government Body" });
            return;
        }

        res.status(200).json(govt.departments);
    } catch (error) {
        console.error("Error in getMyMinistries controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}