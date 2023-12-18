import cors from 'cors'
import express from 'express'
import studentActivitiesRoute from './routes/activities/studentActivities.js'
import loginRoute from './routes/users/login.js'
import studentsRoute from './routes/users/students.js'

// CONFIGS
const app = express()
app.use(cors())

// ROUTES

// STUDENT
app.use(studentsRoute)
app.use(loginRoute)
app.use(studentActivitiesRoute)


// SERVER
const PORT = 3000
app.listen(PORT, () => console.log("Server is running on port " + PORT))

