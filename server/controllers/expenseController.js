const Expenses = require("../models/expenseModel");

const addExpense = async (req, res) => {
     try {
           const userId = req.userId;
          const { expenseName, amount, transactionMode } = req.body;
          if (!expenseName || !amount || !transactionMode) {
               return res.status(400).json({ message: "put valid fields" })
          }
          const expense = new Expenses(
               {
                    expenseName: expenseName,
                    amount: amount,
                    transactionMode: transactionMode,
                    user: userId
               })
             await expense.save();
               res.status(201).json(expense)
     } catch (error) {
          console.log(error);
          res.status(500).json({expemse});
     }
}

const showExpense = async (req, res) => {
         const uderId = req.userId
         const {currentday} = req.query;
         const date = new Date();
         console.log(typeof(date));
         console.log(date.getMonth());
         if(currentday == true){
           
            }
     }

module.exports = { addExpense, showExpense };