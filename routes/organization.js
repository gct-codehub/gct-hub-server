import express from "express"
const router = express.Router()

// import {create,assign,createRole,searchOrg,searchRole} from "../controllers/organization.js";
import org from "../controllers/organization.js"
import roles from "../controllers/roles.js"
import { isSignedIn } from "../controllers/authController.js";
import accessFilter from "../middleware/accessFilter.js"

router.post("/create",isSignedIn,accessFilter("createOrg"),org.create);
router.put("/update",isSignedIn,accessFilter("updateOrg"),org.update)

router.post("/assignRole",isSignedIn,accessFilter("assignRole"),roles.assign)
router.post("/role/create",isSignedIn,accessFilter("createRole"),roles.create)


router.get("/search/organization",org.search)
router.get("/search/role/:orgId",roles.search)

export default router