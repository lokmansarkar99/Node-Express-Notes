import express from 'express'
import logger from './logger.js'
import PORT from './env.js'
const app = express()


app.use(express.static('public')) // Serve static files from the 'public' directory
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



