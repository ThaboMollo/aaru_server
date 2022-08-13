const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { createPoem, listAllPoems, getPoemById, updatePoem } = require('../controllers/poem');
const { userById, addPoemToUserHistory } = require('../controllers/user');

router.post('/poem/create/:userId',  requireSignin,  isAuth, addPoemToUserHistory, createPoem );
router.get( '/poem/list/:userId',  requireSignin,  isAuth,  isAdmin,  listAllPoems );
router.get( "/poem/by-id/:userId", requireSignin, isAuth, getPoemById );
router.put( "/poem/update/:poemId/:userId", requireSignin, isAuth, isAdmin, updatePoem );

router.param('poemId', getPoemById);
router.param('userId', userById);

module.exports = router;
