import express, { Request, Response } from "express";
import { connectDb } from "./connect";
import { URL } from "./models/urls";
import router from "./routes/url";
import path from "path";
import staticRoute from "./routes/staticRouter";

const app = express();
const PORT = 8001;

const urlRoute = router;

connectDb("mongodb://localhost:27017/url-shortener").then(() => {
    console.log("Connected to database");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/test", async (req, res) => {
    const allUrls = await URL.find({});

    return res.render("home", {
        urls: allUrls,
    });
});

app.use("/url", urlRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async (req: Request, res: Response) => {
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
