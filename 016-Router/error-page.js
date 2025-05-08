// Express js Server
import express from 'express';

import  path  from 'path';

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res)=> {

res.json({"message": "HEllo Expresss"})

})



app.use((req, res)=> {
// return res.status(404).sendFile('error-page.html', {root: 'public/views'})
return res.status(404).sendFile(path.join(import.meta.dirname, 'public' , 'views', 'error-page.html' ))

})

app.listen(PORT, () => { 
    console.log(`Server is running on http://localhost:${PORT}`);
})

