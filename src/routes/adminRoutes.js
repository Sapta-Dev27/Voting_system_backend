import express from 'express';

import adminMiddleware from '../middlewares/admin.js';
import homeMiddleware from '../middlewares/auth.js';

import addCandidateController from '../controllers/admin/create.js';
import deleteCandidateController from '../controllers/admin/delete.js';
import updateCandidateController from '../controllers/admin/update.js';


const router = express.Router();


router.post('/addCandidate', homeMiddleware, adminMiddleware, addCandidateController);
router.delete('/deleteCandidate/:id', homeMiddleware, adminMiddleware, deleteCandidateController);
router.put('/updateCandidate/:id', homeMiddleware, adminMiddleware, updateCandidateController)


export default router;