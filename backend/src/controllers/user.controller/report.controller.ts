import { Request, Response } from "express";
import Report from "../../models/report.model";

export const getReportById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const report = await Report.findById(id)
            .populate({
                path: "reporter",
                select: "name email"
            });
        if (!report) {
            res.status(400).json({ error: "Cannot find report" });
            return;
        }

        res.status(200).json(report);
    } catch (error) {
        console.log("Error in User getReportById controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}