
import { verifyToken } from '../services/auth.services.js';

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

export const verifyAuth= (req, res, next) => {

    const token = req.cookies.access_token

    if(!token) {
        req.user = null;
        return next()
    }

    try {
        const decodedToken = verifyToken(token)
        req.user =decodedToken;
        // console.log('Token verified successfully:', decodedToken);
        console.log('User:', req.user);
    } catch (error) {
        console.error('Token verification failed:', error);
        req.user = null;
        return next();
        
    }

    next();

}