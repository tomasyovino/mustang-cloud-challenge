import { Router } from "express";
import * as teamCtrl from "../controllers/team.controller.js";

const router = Router();


router.get("/", async (req, res) => {
    const data = await teamCtrl.MBGetData();
    res.render("main", { teams: data });
})

export default router;