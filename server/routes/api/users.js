const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');
const upload = require('../../multerConfig'); // Importez la configuration Multer
const verifyJWT = require('../../middleware/verifyJWT')

router.get('/search', usersController.searchUsers); 
router.get('/profile-image', verifyJWT, usersController.getUserProfileImage);
router.get('/profile/:username', usersController.getUser)
router.route('/')
    .get(verifyRoles(ROLES_LIST.User), usersController.getAllUsers)
    .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

    
router.put('/', verifyJWT, usersController.updateUserProfileImage);


router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser)


module.exports = router;