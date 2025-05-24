/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

export const getAboutPage = (req, res) => { 
    res.render('About')
}