import express,{ Application } from "express";
import { auth } from "../middleware/auth";
import { validateUserData, loginValidationData, updateValidateData } from "../validators/User";
import { userController } from "../controller/User";
const router: Application = express();


router.post('/users', validateUserData,  userController.createUser )

router.post('/users/login', loginValidationData, userController.login)

router.get('/users/me', auth, userController.getUserDetails )

//only Admin can get all user
router.get('/users', auth, userController.getAllUserDetails )
router.get('/checkUser', auth, userController.getUserDetail )

router.patch('/users/me', [updateValidateData, auth], userController.updateUser )

router.delete('/users/me', auth, userController.deleteUser )

module.exports = router;
