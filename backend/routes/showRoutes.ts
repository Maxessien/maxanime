import { Router } from "express";
import { addNewShow, getShows, getSpecificShow } from "../controllers/showsControllers.js";


const router = Router()

router.get("/", getShows)
router.get("/:id", getSpecificShow)
router.post("/", addNewShow)


const showRoutes = router

export default showRoutes