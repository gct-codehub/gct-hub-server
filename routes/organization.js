import express from "express"
const router = express.Router()

import { create } from "../controllers/organization";

router.post("/create",create);

export default router