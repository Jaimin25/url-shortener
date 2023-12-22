import express from "express";
import { handleGenerateShortUrl } from "../controllers/url";
import { handleGetAnalytics } from "../controllers/url";
const router = express.Router();

router.post("/", handleGenerateShortUrl);

router.get("/analytics/:shortId", handleGetAnalytics);

export default router;
