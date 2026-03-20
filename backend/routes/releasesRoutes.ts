import { Router } from "express";
import { getLatestReleases, getSpecificReleases } from "../controllers/releasesControllers.js";


const router = Router()

router.get("/", getLatestReleases)
router.get("/:id", getSpecificReleases)


const releasesRoutes = router

export default releasesRoutes