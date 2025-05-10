// Express js Server
import express from 'express';
import { hC, rC } from '../controllers/controller.js';

const router = express.Router()

router.get('/', rC) 
router.get('/hello', hC) 




export default router