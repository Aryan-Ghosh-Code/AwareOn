import { Request, Response } from "express";
import Problem from "../models/problem.model";
import Project from "../models/project.model";

export const getStats = async (req: Request, res: Response) => {
    try {
        // --- Problems Aggregation ---
        const problemsAgg = await Problem.aggregate([
            {
                $facet: {
                    // Total problems
                    total: [{ $count: "count" }],

                    // SDG 13 problems
                    sdg13: [
                        { $match: { SDG: { $in: ["13"] } } },
                        { $count: "count" }
                    ],
                    // SDG 14 problems
                    sdg14: [
                        { $match: { SDG: { $in: ["14"] } } },
                        { $count: "count" }
                    ],
                    // SDG 15 problems
                    sdg15: [
                        { $match: { SDG: { $in: ["15"] } } },
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
                    problems13: { $ifNull: [{ $arrayElemAt: ["$sdg13.count", 0] }, 0] },
                    problems14: { $ifNull: [{ $arrayElemAt: ["$sdg14.count", 0] }, 0] },
                    problems15: { $ifNull: [{ $arrayElemAt: ["$sdg15.count", 0] }, 0] },
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

        // --- Projects Aggregation (Funds per SDG) ---
        const fundsAgg = await Project.aggregate([
            {
                $project: {
                    fundRaised: 1,
                    sdg13: {
                        $cond: [
                            {
                                $gt: [
                                    {
                                        $size: {
                                            $filter: {
                                                input: "$SDG",
                                                as: "s",
                                                cond: { $regexMatch: { input: "$$s", regex: /^13\./ } }
                                            }
                                        }
                                    },
                                    0
                                ]
                            },
                            "$fundRaised",
                            0
                        ]
                    },
                    sdg14: {
                        $cond: [
                            {
                                $gt: [
                                    {
                                        $size: {
                                            $filter: {
                                                input: "$SDG",
                                                as: "s",
                                                cond: { $regexMatch: { input: "$$s", regex: /^14\./ } }
                                            }
                                        }
                                    },
                                    0
                                ]
                            },
                            "$fundRaised",
                            0
                        ]
                    },
                    sdg15: {
                        $cond: [
                            {
                                $gt: [
                                    {
                                        $size: {
                                            $filter: {
                                                input: "$SDG",
                                                as: "s",
                                                cond: { $regexMatch: { input: "$$s", regex: /^15\./ } }
                                            }
                                        }
                                    },
                                    0
                                ]
                            },
                            "$fundRaised",
                            0
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    funds13: { $sum: "$sdg13" },
                    funds14: { $sum: "$sdg14" },
                    funds15: { $sum: "$sdg15" }
                }
            }
        ]);

        // Final response
        res.json({
            ...problemsAgg[0],
            ...(fundsAgg[0] || { funds13: 0, funds14: 0, funds15: 0 })
        });
    } catch (error) {
        console.log("Error in getStats controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};