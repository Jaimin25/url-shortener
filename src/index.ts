import express from "express";
import { connectDb } from "./connect";
import { URL } from "./models/urls";
import router from "./routes/url";

const app = express();
const PORT = 8001;

const urlRoute = router;

connectDb("mongodb://localhost:27017/url-shortener").then(() => {
    console.log("Connected to database");
});

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req: any, res: any) => {
    const shortId: string = req.params.shortId;
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

    res.redirect(entry!.redirectUrl);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
