import express from 'express';
import controller from '../controllers/user';
import extractJWT from '../middleware/extractJWT';

const router  = express.Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/getAllUsers', controller.getAllUsers);

//Protected routes
router.get('/validate', extractJWT, controller.validateToken);


export = router;