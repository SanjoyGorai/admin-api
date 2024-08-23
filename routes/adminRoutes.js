import express from 'express';
import {
    signupAdmin,
    loginAdmin,
    getAllAdmins,
    getAdminById,
    updateAdminById,
    deleteAdminById,
    deleteAllAdmins
} from '../controllers/adminController.js';
import { validateSignup, validateLogin } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/signup', validateSignup, signupAdmin);
router.post('/login', validateLogin, loginAdmin);
router.get('/', getAllAdmins);
router.get('/:id', getAdminById);
router.put('/:id', updateAdminById);
router.delete('/:id', deleteAdminById);
router.delete('/', deleteAllAdmins);

export default router;
