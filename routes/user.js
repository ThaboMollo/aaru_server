const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById, read, update, deleteUser, listUsers } = require('../controllers/user');

router.get('/secret', requireSignin, (req, res) => {
    res.json({
        user: 'got here yay'
    });
});

router.get('/user/:userId', requireSignin, isAuth, read);
router.put('/user/update/:userId', requireSignin, isAuth, update);
// router.delete('/user/delete/:userId', requireSignin, isAuth, deleteUser);
router.get('/users/all/:userId', requireSignin, isAuth, isAdmin, listUsers);

router.param('userId', userById);

module.exports = router;
