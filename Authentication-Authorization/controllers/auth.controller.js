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




export const postLoginPage = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Debug: Log received data
        console.log('Received email:', email);
        console.log('Received password:', password);
        
        // Validate input
        if (!email || !password) {
            return res.status(400).send('Email and password are required');
        }

        // Check if user exists
        const user = await getUserByEmail(email);
        console.log('Found user:', user);
        
        if (!user) { 
            return res.status(401).send('Invalid email '); // Don't reveal which is wrong
        }

        // Check password
        if (user.password !== password) {
            return res.status(401).send('Invalid  password');
        }

        // Success - set cookie and redirect
        console.log("User exists and password is correct");
        
        // Set cookie with proper options
        res.cookie("isLoggedIn", "true", {
            httpOnly: false,  // Allow client-side access if needed
            secure: false,    // Set to true in production with HTTPS
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            path: '/'
        });
        
        res.redirect('/');
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Internal server error');
    }
};

