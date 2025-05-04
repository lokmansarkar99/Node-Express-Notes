import express from 'express'
import logger from './logger.js'
import PORT from './env.js'
import path from 'path'
import { fileURLToPath } from 'url'
const app = express()

// static path for serving static files

app.use(express.static('public')) // Serve static files from the 'public' directory
const staticPath = path.join(import.meta.dirname, 'public')

// app.use(express.static('public')) // Serve static files from the 'public' directory

app.use(express.static(staticPath))

app.get('/' , (req, res) => {
    // res.json({"message": 'Hello from Express'})
    res.send('<h1>Hello from Express</h1>')
    
})
app.use('/middleware',logger ) 
app.get('/middleware' , (req, res) => {
    res.json({"message": 'Hello from Express middleware'})
})



// server the html file from the public directory
app.get('/contact' , (req, res) => {
    res.sendFile('contact.html', { root: 'public' })
})

app.listen(PORT,  () => {
    console.log("Express server running on " + PORT)
})



