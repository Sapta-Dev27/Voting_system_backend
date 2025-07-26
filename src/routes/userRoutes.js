import express from "express";

import userRegisterController from "../controllers/users/register.js"
import userLoginController from "../controllers/users/login.js";
import fetchCandidatesController from "../controllers/users/fetch.js";
import fetchCandidateByIdController from "../controllers/users/fetchById.js";
import voteController from "../controllers/users/vote.js";

import homeMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.post('/register' , userRegisterController);
router.post('/login' , userLoginController);
router.get('/candidates' , homeMiddleware , fetchCandidatesController);
router.get('/candidate/:id' , homeMiddleware , fetchCandidateByIdController);
router.post('/vote/:id' , homeMiddleware , voteController)

export default router;