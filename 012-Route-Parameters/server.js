// Express js Server
import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => { 
    res.send('Hello World!');
})


app.get('/user/:userId', (req, res) => { 

    const userId = req.params.userId;

    console.log(req.params)

    res.send(`User ID: ${userId}`);

})

app.get('/user/:userId/article/:slug', (req, res) => { 

 
    const userId = req.params.userId;
        const slug = req.params.slug;
    
        console.log(req.params)
    const formattedSlug = slug.replace(/-/g, '')
        // res.send(`User ID: ${userId} and Slug: ${slug}`);
        res.send(`User ID: ${userId} and Slug: ${formattedSlug}`);

})

app.listen(PORT, () => { 
    console.log(`Server is running on http://localhost:${PORT}`);
})

