import express from "express"
import { PORT, mongoDBURL} from "./config.js"
import mongoose from "mongoose"
import booksRoute from "./routes/booksRoute.js"
import  cors from "cors"

const app =express()


app.use(express.json())
app.use(cors())//either use like this
/*app.use(cors({
    origin:"http://localhost:3000",
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Conten-Type'],
}))*/




app.get("/",(req,res)=>{
    console.log(req)
    return res.status(200).send("doing great 1st mern copy")
})

app.use("/books",booksRoute)



mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log("connected to database")
        app.listen(PORT, ()=> console.log("STARTED AT PORT"))
    })
    .catch((error)=>{
        console.log(error)
    })

   