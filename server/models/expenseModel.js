const mongoose = require("mongoose");
const User = require('./usermodel')   
const expenseSchema  =  new mongoose.Schema({
     expenseName:{
       type:String,
       required:true  
    },
    amount:{
        type:Number,
        required:true,
    },
    transactionMode:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
})

const Expenses = mongoose.model('expenses' , expenseSchema);

module.exports = Expenses;
