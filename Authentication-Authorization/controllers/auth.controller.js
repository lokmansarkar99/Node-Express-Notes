import { getUserByEmail, createUser } from '../services/auth.services.js';



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
export const postLoginPage = (req, res) => {
    
    // res.setHeader("Set-Cookie", "isLoggedIn=true; path=/;")
    res.cookie("isLoggedIn", true)
    res.redirect('/');
    
}


