import { getUserByEmail, createUser, generateToken } from '../services/auth.services.js';
import argon2 from 'argon2'


/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */


export const getRegisterPage = (req, res) => {
    res.render('auth/Register',{eu_errors: req.flash('eu_errors')})
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */


export const postRegisterPage = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      req.flash('eu_errors', 'User already exists with this email');
      return res.redirect('/register');
    }

    await createUser({ name, email, password });

    res.redirect('/login');
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send('Internal Server Error');
  }
};


/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getLoginPage = (req, res) => {
if(req.user) {return res.redirect('/');}
    res.render('auth/Login', {ene_errors: req.flash('ene_errors')})
}


/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */



export const postLoginPage = async (req, res) => {

  if(req.user) {return res.redirect('/');}

    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).send('Email and password are required');
        }

        // Check if user exists
        const user = await getUserByEmail(email);
        if (!user) {
            req.flash('ene_errors', 'Invalid email or password');
            return res.redirect('/login');
        }

        // Compare input password with stored hashed password
        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            req.flash('ene_errors', 'Invalid email or password');
            return res.redirect('/login');

        }

        // Debug: Optional logs
        console.log("User exists and password is correct");

        // Set login cookie
        // res.cookie("isLoggedIn", "true", {
        //     httpOnly: true,    // More secure
        //     secure: false,     // Set true in production (HTTPS)
        //     maxAge: 24 * 60 * 60 * 1000, // 1 day
        //     path: '/'
        // });

        const token = generateToken({
            id: user.id,
            name: user.name,
            email: user.email
        })

        res.cookie("access_token", token , {
            httpOnly: true,    // More secure
            secure: false,     // Set true in production (HTTPS)
            maxAge: 7 * 24 * 60 * 60 * 1000, // 1 day
        })

        res.redirect('/');
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Internal server error');
    }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */


export const getLogout = (req, res) => {
  res.clearCookie('access_token');
  res.redirect('/login');
}