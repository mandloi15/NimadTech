import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: "*",
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Nimad Tech Backend Running")
})

export default app