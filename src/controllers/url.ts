import { Request, Response } from "express";
import { URL } from "../models/urls";

const shortid = require("shortid");

interface analytics {
    visitHistory: [
        totalClick: number,
        analytics: [
            {
                timestamp: Date;
                _id: string;
            }
        ]
    ];
}

export async function handleGenerateShortUrl(req: Request, res: Response) {
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({
            error: "url is required",
        });
    }

    const shortId = shortid(8);
    await URL.create({
        shortId,
        redirectUrl: body.url,
        visitHistory: [],
    });

    return res.json({ id: shortId });
}

export async function handleGetAnalytics(req: Request, res: Response) {
    const shortId: string = req.params.shortId;
    const result = (await URL.findOne({
        shortId,
    })) as analytics;

    return res.json({
        totalClick: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}
