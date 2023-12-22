import { URL } from "../models/urls";

const shortid = require("shortid");

export async function handleGenerateShortUrl(req: any, res: any) {
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

export async function handleGetAnalytics(req: any, res: any) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({
        shortId,
    });

    return res.json({
        totalClick: result!.visitHistory.length,
        analytics: result!.visitHistory,
    });
}
