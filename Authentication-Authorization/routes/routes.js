import { Router } from "express";
import { getLoginPage, getRegisterPage, postLoginPage } from "../controllers/auth.controller.js";

const router = Router()

router.get('/register', getRegisterPage)
router.get('/login', getLoginPage)
router.post('/login', postLoginPage)
// router.route("/login").get(getLoginPage).post(postLoginPage)

export const authRoutes = router
