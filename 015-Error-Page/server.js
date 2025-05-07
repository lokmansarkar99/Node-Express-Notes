// Express js Server
import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));



// app.get('/contact', (req, res) => { 

//     console.log(req.query);
//     // res.send('OK')
//     res.redirect("/")


// })


app.post('/contact', (req, res) => {

    console.log(req.body);
    // res.send('OK')
    res.redirect("/")
    
 })



app.listen(PORT, () => { 
    console.log(`Server is running on http://localhost:${PORT}`);
})

