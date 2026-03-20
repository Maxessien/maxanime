import express from "express"
import showRoutes from "./routes/showRoutes.js"


const app = express()


app.use(express.json())

//Add routes here
app.use("/shows", showRoutes)


const port = process.env.PORT || 5050
app.listen(Number(port), "0.0.0.0", ()=>console.log("Server running on port", port))