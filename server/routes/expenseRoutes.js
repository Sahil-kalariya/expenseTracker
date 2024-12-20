const express = require('express');
const {addExpense, showExpense} = require('../controllers/expenseController');
const authMiddleware = require('../controllers/authMiddleware');
const router = express.Router();

router.post('/addexpense' , authMiddleware , addExpense);
router.get('/showexpense',authMiddleware,showExpense);

module.exports = router;