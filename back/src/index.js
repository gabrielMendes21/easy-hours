// IMPORTS

import cors from 'cors'

// CONFIGS

const app = express()

app.use(express.json())
app.use(cors())


// ROUTES

app.get('/', (req, res) => {
    return res.json({ msg: "You are in route '/'" })
})


// SERVER

const PORT = 3000
app.listen(PORT, () => console.log("Server is running on port " + PORT))

