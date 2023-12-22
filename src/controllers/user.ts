import { Request, Response } from "express";
import { User } from "../models/users";
import { v4 as uuidv4 } from "uuid";
import { setUser } from "../util/auth";

export async function handleUserSignup(req: Request, res: Response) {
    const { name, email, password } = req.body;
    await User.create({ name, email, password });

    return res.redirect(".");
}

export async function handleUserLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = (await User.findOne({ email, password })) as typeof User;

    if (!user) {
        return res.render("login", {
            error: "Invalid email or password",
        });
    }

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    return res.redirect("/");
}
