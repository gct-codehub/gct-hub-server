import express from "express"

const router = express.Router()

import {search} from "../controllers/user.js"

router.post("/search",search)

export default router