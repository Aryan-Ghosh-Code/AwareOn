import { Request, Response } from "express";
import Problem from "../models/problem.model";

export const getStats = async (req: Request, res: Response) => {
    try {
        // --- Problems Aggregation ---
        const problemsAgg = await Problem.aggregate([
            {
                $facet: {
                    // Total problems
                    total: [{ $count: "count" }],

                    // Ministry of Road Transport and Highways problems
                    roadTransport: [
                        { $match: { ministry: "Ministry of Road Transport and Highways" } },
                        { $count: "count" }
                    ],
                    // Urban Development Department problems
                    urbanDevelopment: [
                        { $match: { ministry: "Urban Development Department" } },
                        { $count: "count" }
                    ],
                    // Traffic Police Department problems
                    trafficPolice: [
                        { $match: { ministry: "Traffic Police Department" } },
                        { $count: "count" }
                    ],
                    // Transport Department problems
                    transport: [
                        { $match: { ministry: "Transport Department" } },
                        { $count: "count" }
                    ],
                    // Forest Department problems
                    forest: [
                        { $match: { ministry: "Forest Department" } },
                        { $count: "count" }
                    ],
                    // Ministry of Environment problems
                    environment: [
                        { $match: { ministry: "Ministry of Environment" } },
                        { $count: "count" }
                    ],
                    // Municipal Health Department problems
                    municipalHealth: [
                        { $match: { ministry: "Municipal Health Department" } },
                        { $count: "count" }
                    ],
                    // Public Works Department (PWD) problems
                    publicWorks: [
                        { $match: { ministry: "Public Works Department (PWD)" } },
                        { $count: "count" }
                    ],
                    // Power Supply Department problems
                    powerSupply: [
                        { $match: { ministry: "Power Supply Department" } },
                        { $count: "count" }
                    ],

                    // Pending
                    pending: [
                        { $match: { statusForUser: "pending" } },
                        { $count: "count" }
                    ],

                    // Ongoing
                    ongoing: [
                        { $match: { statusForUser: "ongoing" } },
                        { $count: "count" }
                    ],

                    // Resolved for User
                    resolvedUser: [
                        { $match: { statusForUser: "solved" } },
                        { $count: "count" }
                    ],

                    // Resolved for Govt
                    resolvedGovt: [
                        { $match: { statusForGovt: "solved" } },
                        { $count: "count" }
                    ],

                    // Problems reported in time ranges
                    oneHourAgo: [
                        { $match: { createdAt: { $gte: new Date(Date.now() - 1 * 60 * 60 * 1000) } } },
                        { $count: "count" }
                    ],
                    sixHoursAgo: [
                        { $match: { createdAt: { $gte: new Date(Date.now() - 6 * 60 * 60 * 1000) } } },
                        { $count: "count" }
                    ],
                    twelveHoursAgo: [
                        { $match: { createdAt: { $gte: new Date(Date.now() - 12 * 60 * 60 * 1000) } } },
                        { $count: "count" }
                    ],
                    oneDayAgo: [
                        { $match: { createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } } },
                        { $count: "count" }
                    ],
                    threeDaysAgo: [
                        { $match: { createdAt: { $gte: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) } } },
                        { $count: "count" }
                    ],
                    sevenDaysAgo: [
                        { $match: { createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } } },
                        { $count: "count" }
                    ],
                    thirtyDaysAgo: [
                        { $match: { createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } } },
                        { $count: "count" }
                    ]
                }
            },
            {
                $project: {
                    problems: { $ifNull: [{ $arrayElemAt: ["$total.count", 0] }, 0] },
                    roadTransportProblems: { $ifNull: [{ $arrayElemAt: ["$roadTransport.count", 0] }, 0] },
                    urbanDevelopmentProblems: { $ifNull: [{ $arrayElemAt: ["$urbanDevelopment.count", 0] }, 0] },
                    trafficPoliceProblems: { $ifNull: [{ $arrayElemAt: ["$trafficPolice.count", 0] }, 0] },
                    transportProblems: { $ifNull: [{ $arrayElemAt: ["$transport.count", 0] }, 0] },
                    forestProblems: { $ifNull: [{ $arrayElemAt: ["$forest.count", 0] }, 0] },
                    environmentProblems: { $ifNull: [{ $arrayElemAt: ["$environment.count", 0] }, 0] },
                    municipalHealthProblems: { $ifNull: [{ $arrayElemAt: ["$municipalHealth.count", 0] }, 0] },
                    publicWorksProblems: { $ifNull: [{ $arrayElemAt: ["$publicWorks.count", 0] }, 0] },
                    powerSupplyProblems: { $ifNull: [{ $arrayElemAt: ["$powerSupply.count", 0] }, 0] },
                    pendingProblems: { $ifNull: [{ $arrayElemAt: ["$pending.count", 0] }, 0] },
                    ongoingProblems: { $ifNull: [{ $arrayElemAt: ["$ongoing.count", 0] }, 0] },
                    resolvedForUser: { $ifNull: [{ $arrayElemAt: ["$resolvedUser.count", 0] }, 0] },
                    resolvedForGovt: { $ifNull: [{ $arrayElemAt: ["$resolvedGovt.count", 0] }, 0] },
                    problemsReported: {
                        oneHourAgo: { $ifNull: [{ $arrayElemAt: ["$oneHourAgo.count", 0] }, 0] },
                        sixHoursAgo: { $ifNull: [{ $arrayElemAt: ["$sixHoursAgo.count", 0] }, 0] },
                        twelveHoursAgo: { $ifNull: [{ $arrayElemAt: ["$twelveHoursAgo.count", 0] }, 0] },
                        oneDayAgo: { $ifNull: [{ $arrayElemAt: ["$oneDayAgo.count", 0] }, 0] },
                        threeDaysAgo: { $ifNull: [{ $arrayElemAt: ["$threeDaysAgo.count", 0] }, 0] },
                        sevenDaysAgo: { $ifNull: [{ $arrayElemAt: ["$sevenDaysAgo.count", 0] }, 0] },
                        thirtyDaysAgo: { $ifNull: [{ $arrayElemAt: ["$thirtyDaysAgo.count", 0] }, 0] }
                    }
                }
            }
        ]);

        // Final response
        res.json(problemsAgg[0]);
    } catch (error) {
        console.log("Error in getStats controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};