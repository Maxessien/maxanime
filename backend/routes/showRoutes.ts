import { Router } from "express";
import { addNewShow, getShows } from "../controllers/showsControllers.js";


const router = Router()

router.get("/", getShows)
router.get("/:id", getShows)
router.post("/", addNewShow)


const showRoutes = router

export default showRoutes