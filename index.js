const express = require("express");
const URL = require("./models/urls");
const { connectDb } = require("./connect");

const app = express();
const PORT = 8001;

const urlRoute = require("./routes/url");

connectDb("mongodb://localhost:27017/url-shortener").then(() => {
    console.log("Connected to database");
});

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );

    res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
