import { getUserByEmail, createUser, generateToken } from '../services/auth.services.js';
import argon2 from 'argon2'


/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */


export const getRegisterPage = (req, res) => {
    res.render('auth/Register')
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
      // User already exists, send a message (you can also render page with error)
      return res.status(400).send('User already exists with this email');
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
    res.render('auth/Login')
}


/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */



export const postLoginPage = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).send('Email and password are required');
        }

        // Check if user exists
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        // Compare input password with stored hashed password
        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            return res.status(401).send('Invalid email or password');
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

        res.cookie("access_token", token)

        res.redirect('/');
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Internal server error');
    }
};

