import express from 'express';
import controller from '../controllers/user'

const router  = express.Router();

router.get('/validate', controller.validateToken);
router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/getAllUSers', controller.getAllUsers);

export = router;