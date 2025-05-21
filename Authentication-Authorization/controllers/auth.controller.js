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


