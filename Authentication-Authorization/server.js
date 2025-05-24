// server.js
import express from 'express';
import cookieParser from 'cookie-parser';
import { authRoutes } from './routes/routes.js';
import { verifyAuth } from './middleware/verify.middleware.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser())
app.use(verifyAuth)
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set("view engine", "ejs")

app.use(authRoutes)
// Route: GET /hello
app.get('/', (req, res) => {

// let isLoggedIn = req.headers.cookie;
// isLoggedIn = Boolean(isLoggedIn?.split(";")?.find((cookie) => cookie.trim().startsWith("isLoggedIn"))?.split("=")[1]);
let access_token= req.cookies.access_token


// console.log( isLoggedIn)

 res.render('Home', {access_token})
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
