// Express js Server
import express from 'express';
import router from './routes/router.js'
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.use(router )
app.get('/', (req, res) => { 
res.send("Hello")


})




app.listen(PORT, () => { 
    console.log(`Server is running on http://localhost:${PORT}`);
})

