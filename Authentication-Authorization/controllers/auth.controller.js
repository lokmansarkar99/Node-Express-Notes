import { loginUserSchema, registerUserSchema } from '../validators/auth_validators.js';
import { getUserByEmail, createUser, generateToken , createSession, createAccessToken, createRefreshToken} from '../services/auth.services.js';
import argon2 from 'argon2'
import prisma from './prismaController.js';


/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */


export const getRegisterPage = (req, res) => {
    res.render('auth/Register',{errors: req.flash('errors')})
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */


export const postRegisterPage = async (req, res) => {
  // const { name, email, password } = req.body;

 const {data, error} =  registerUserSchema.safeParse(req.body)
  const { name, email, password } = data;
//  console.log("Data" , data)
  if (error) { 
    const errors = error.errors[0].message;
    req.flash('errors', errors);
    console.error('Validation error:', error);
    res.redirect('/register');
  }

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      req.flash('errors', 'User already exists with this email');
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
    res.render('auth/Login', {errors: req.flash('errors')})
}


/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */



export const postLoginPage = async (req, res) => {

  if(req.user) {return res.redirect('/');}

    try {
        // const { email, password } = req.body;
       const {data, error} = loginUserSchema.safeParse(req.body)

        if (error) { 
            const errors = error.errors[0].message;
            req.flash('errors', errors);
            console.error('Validation error:', error);
            return res.redirect('/login');
        }
        const { email, password } = data;

        // Validate input
        if (!email || !password) {
            return res.status(400).send('Email and password are required');
        }

        // Check if user exists
        const user = await getUserByEmail(email);
        if (!user) {
            req.flash('errors', 'Invalid email or password');
            return res.redirect('/login');
        }

        // Compare input password with stored hashed password
        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            req.flash('errors', 'Invalid email or password');
            return res.redirect('/login');

        }

        // Debug: Optional logs
        console.log("User exists and password is correct");


   


        // Create a session for the user
        const session = await createSession( user.id, {
         ipAddress: req.clientIp,
          userAgent: req.headers['user-agent'],
          
        })

        // access token create
        const accessToken = createAccessToken({
          id: user.id,
          name: user.name,
          email: user.email,
          sessionId: prisma.session.id
        })


        // create refresh token
        const refreshToken = createRefreshToken(prisma.session.id)

        const baseConfig = {httpOnly: true, secure: true}
        // Set the access token in a cookie
        res.cookie('access_token', accessToken, { 
            ...baseConfig,
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

// set the refresh token in a cookie
        res.cookie('refresh_token', refreshToken, { 
            ...baseConfig,
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

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