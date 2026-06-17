import express from 'express';
import controllerUser from '../controllers/users.controllers.js';
import { login } from '../controllers/auth.controllers.js';
import { autorizar, proteger } from '../middleware/auth.middleware.js';



const router = express.Router();


// publicas (user)


router.post('/register', controllerUser.createUser);
router.get('/login', login );

// privadas (admin)


router.get('/usuarios', proteger, autorizar ('admin', controllerUser.getUser));
router.get('/usuarios/:id', proteger , controllerUser.getUserById);
router.delete('/usuarios/:id', proteger,  autorizar ('admin'), controllerUser.deleteUser);
router.put('/usuarios/:id', proteger , autorizar ('admin'), controllerUser.updateUser);



export default router;


