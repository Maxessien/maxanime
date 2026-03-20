import { Router } from "express";
import { addNewShow, getLatestReleases, getShows, getSpecificShow } from "../controllers/showsControllers.js";


const router = Router()

router.get("/", getShows)
router.get("/releases", getLatestReleases)
router.get("/:id", getSpecificShow)
router.post("/", addNewShow)


const showRoutes = router

export default showRoutes