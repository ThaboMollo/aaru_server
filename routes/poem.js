const express = require('express');
const router = express.Router();

const { requireSignin, isAuth } = require('../controllers/auth');
const { createPoem, listAllPoems, getPoemById, updatePoem, deletePoem } = require('../controllers/poem');
const { userById, addPoemToUserHistory } = require('../controllers/user');

router.post('/poem/create/:userId',  requireSignin,  isAuth, addPoemToUserHistory, createPoem );
router.get('/poem/list',  listAllPoems );
// router.get('/poem/by-id/:poemId', getPoem );
router.put('/poem/update/:poemId/:userId', requireSignin, isAuth, updatePoem );
router.delete('/poem/delete/:poemId/:userId', requireSignin, isAuth, deletePoem);

router.param('poemId', getPoemById);
router.param('userId', userById);

module.exports = router;
