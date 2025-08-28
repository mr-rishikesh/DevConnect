import dotenv from "dotenv"
dotenv.config();

import connectToDatabase from "./utils/db.js";
import app from "./app.js"


connectToDatabase().then(() => {
  app.listen(5000, () => {
    console.log(`SERVER running at port: 5000`)
  })
}).catch(() => {
  console.log("Failed to connect to the database.")
})
