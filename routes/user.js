import express from 'express';
import { createUser, 
         loginUser, 
         getAllUsers, 
         getCurrentUser,
         updateUser,
         deleteUser,
         getUserById} from '../controllers/user';
import { checkExistingUser,
         validateUserEntry,
         validateUserLoginEntry,
         authUserLogin,
         authUserAccess,
         adminAuth,
         checkUserId} from '../middlewares/user';




const router =  express();


router.get('/users', authUserAccess,adminAuth,getAllUsers);

router.get('/users/me', authUserAccess,adminAuth, getCurrentUser);

router.get('/users/:id',checkUserId ,getUserById);

router.post('/users', checkExistingUser, validateUserEntry, createUser);

router.post('/users/login', validateUserLoginEntry, authUserLogin, loginUser);

router.put('/users/:id',checkUserId ,updateUser);

router.delete('/users/:id',checkUserId ,deleteUser);


export default router;