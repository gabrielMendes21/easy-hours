import cors from 'cors'
import express from 'express'
import supportRequestsRoute from './routes/supportRequests.js'
import studentTasksRoute from './routes/tasks/studentTasks.js'
import tasksRoute from './routes/tasks/tasks.js'
import loginRoute from './routes/users/login.js'
import studentsRoute from './routes/users/students.js'

// CONFIGS
const app = express()
app.use(cors())

// ROUTES

// STUDENT
app.use(studentsRoute)
app.use(loginRoute)
app.use(studentTasksRoute)
app.use(supportRequestsRoute)
app.use(tasksRoute)


// SERVER
const PORT = 3000
app.listen(PORT, () => console.log("Server is running on port " + PORT))

