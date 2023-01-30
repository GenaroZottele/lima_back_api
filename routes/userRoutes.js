const express = require('express');
const router = express.Router();

// Controller
const usersController = require('../controllers/userController');

// Middlewares
const upload = require('../middlewares/multerMiddlewareUsers');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// Formulario de registro
router.get('/register', guestMiddleware, usersController.register);

// Procesar el registro
router.post('/register', upload.single("avatar"), validations, usersController.processRegister);

// Formulario de login
router.get('/login', guestMiddleware, usersController.login);

// Procesar el login
router.post('/login', usersController.loginProcess);

// Perfil de Usuario
router.get('/profile', authMiddleware, usersController.profile);

router.post('/profile', authMiddleware, usersController.profile);

router.get('/userDetail', authMiddleware, usersController.userDetail);

router.get('/edit', authMiddleware, usersController.edit);

router.put('/edit', upload.single("image"), authMiddleware, usersController.update);

router.delete('/delete', authMiddleware, usersController.delete);

// Logout
router.get('/logout', authMiddleware, usersController.logout);

module.exports = router;