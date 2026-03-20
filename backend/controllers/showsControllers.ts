import type { Request, Response } from "express"
import { addFilesToCloud } from "../utils/addToCloud.js"
import { FileModel } from "../models/FileModel.js"

interface AddNewShowBody {
    titles?: string[]
    range?: [number, number]
}


const getShows = async(req: Request, res: Response)=>{
    try {
        const shows = await FileModel.find().sort([["createdAt", "desc"]]).lean()
        return res.status(200).json(shows)
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: "No files"})
    }
}

const getSpecificShow = async(req: Request, res: Response)=>{
    try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ message: "Missing id" })
    }

    const show = await FileModel.findOne({ id }).lean()

    if (!show) {
      return res.status(404).json({ message: "No file found" })
    }

    return res.status(200).json(show)
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: "No file found"})
    }
}

const addNewShow = async(req: Request, res: Response)=>{
    try {
        const { titles, range } = req.body as AddNewShowBody

        if (!Array.isArray(titles) || titles.length === 0 || titles.some((title)=> typeof title !== "string" || title.trim().length === 0)) {
            return res.status(400).json({ message: "titles must be a non-empty string array" })
        }

        if (!Array.isArray(range) || range.length !== 2 || !Number.isInteger(range[0]) || !Number.isInteger(range[1]) || range[0] < 1 || range[1] < range[0]) {
            return res.status(400).json({ message: "range must be a tuple [start, end] with valid positive integers" })
        }

        addFilesToCloud(titles, range)

        //Return immediately due to request timeouts
        return res.status(201).json({ message: "Shows added successfully", titles: titles.length, range })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Failed to add shows" })
    }
}

export { getShows, getSpecificShow, addNewShow }