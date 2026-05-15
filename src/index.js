import dotenv from "dotenv"
import mongoose from "mongoose"
import app from "./app.js"

dotenv.config()

const PORT = process.env.PORT || 8000
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("MongoDB Connected")

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})
.catch((error) => {
    console.log("MongoDB Connection Error:",error)
})