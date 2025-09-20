import { Request, Response } from "express";
import Project from "../../models/project.model";
import Problem from "../../models/problem.model";
import Report from "../../models/report.model";
import { ReportGenerationProps } from "../../types";

export const generateReport = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const {
            type,
            startDate,
            endDate,
            actions,
            workforce,
            articulateProof
        }: ReportGenerationProps = req.body;

        let intent;
        if (type === "Project") {
            intent = await Project.findById(id);
        } else {
            intent = await Problem.findById(id);
        }

        const newReport = new Report({
            reporter: req.govt?._id,
            reporterModel: "Govt",
            intentId: id,
            intentModel: type,
            timeline: {
                startDate,
                endDate,
            },
            actions,
            workforce,
            articulateProof
        });

        if (newReport) {
            await newReport.save();

            if (type === "Problem") {
                const problemDoc = intent as typeof Problem.prototype;
                if (!problemDoc.GovtWorking.includes(req.govt?._id)) {
                    problemDoc.GovtWorking.push(req.govt!._id);
                }
                problemDoc.reports.push(newReport._id);
                await problemDoc.save();
            }

            if (type === "Project") {
                const projectDoc = intent as typeof Project.prototype;
                projectDoc.reports.push(newReport._id);
                await projectDoc.save();
            }

            res.status(201).json(newReport);
        }
    } catch (error) {
        console.log("Error in Govt. generateReport controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

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
        console.log("Error in Govt. getReportById controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}