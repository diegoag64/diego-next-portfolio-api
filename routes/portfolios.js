
const express = require('express');
const router = express.Router();
const { checkJwt, checkRole } = require('../controllers/auth');

const {getPortfolios, getPortfolioById, createPortfolio, updatePortfolio, deletePortfolio} = require('../controllers/portfolios');


router.get('/api/v1/portfolios', getPortfolios);

router.get('/api/v1/portfolios/:id', getPortfolioById);

// IMPLEMENT JWT LATER
//router.post('/api/v1/portfolios/', checkJwt ,createPortfolio);

router.post('/api/v1/portfolios/', checkJwt, checkRole('admin'), createPortfolio);

router.patch('/api/v1/portfolios/:id', checkJwt, checkRole('admin'), updatePortfolio);

router.delete('/api/v1/portfolios/:id', checkJwt, checkRole('admin'), deletePortfolio);


module.exports = router;