const shortid = require("shortid");

const URL = require("../models/urls");

async function handleGenerateShortUrl(req, res) {
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

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({
        shortId,
    });

    return res.json({
        totalClick: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports = {
    handleGenerateShortUrl,
    handleGetAnalytics,
};