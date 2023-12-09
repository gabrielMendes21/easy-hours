// IMPORTS

import cors from 'cors'
import express from 'express'
import studentsRoute from './routes/users/students.js'

// CONFIGS

const app = express()

app.use(cors())

// ROUTES

// student
app.use(studentsRoute)


// SERVER
const PORT = 3000
app.listen(PORT, () => console.log("Server is running on port " + PORT))

