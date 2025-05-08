// Express js Server
import express from 'express';

const router = express.Router()

router.get('/hello', (req, res) => {
    res.send("Hello With Express Router")
}) 




export default router