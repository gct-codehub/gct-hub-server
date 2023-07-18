import express from "express"
const router = express.Router()

import {create,assign,createRole,searchOrg,searchRole} from "../controllers/organization.js";

router.post("/create",create);
router.post("/assignRole",assign)
router.post("/role/create",createRole)


router.get("/search/organization",searchOrg)
router.get("/search/role/:orgId",searchRole)

export default router