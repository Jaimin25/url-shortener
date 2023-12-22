import express, { Request, Response } from "express";
import { URL } from "../models/urls";

const router = express.Router();

router.get("/", async (req: any, res: any) => {
    if (!req.user) return res.redirect("/login");

    const allUrls = await URL.find({ createdBy: req.user._id });
    res.render("home", {
        urls: allUrls,
    });
});

router.get("/signup", (req: Request, res: Response) => {
    return res.render("signup");
});

router.get("/login", (req: Request, res: Response) => {
    return res.render("login");
});

export default router;
