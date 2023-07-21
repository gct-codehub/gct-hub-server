import express from "express"
const router = express.Router()

import {create,assign,createRole,searchOrg,searchRole} from "../controllers/organization.js";
import { isSignedIn,accessFilter } from "../controllers/authController.js";

router.post("/create",isSignedIn,accessFilter(),create);
router.post("/assignRole",assign)
router.post("/role/create",createRole)


router.get("/search/organization",searchOrg)
router.get("/search/role/:orgId",searchRole)

export default router