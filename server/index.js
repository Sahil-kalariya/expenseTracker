require('dotenv').config();
const express = require("express");
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/auhtRoutes.js');
const expenseRoutes = require('./routes/expenseRoutes.js');
const cookieParser = require('cookie-parser');
const app = express();

const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json());

app.use("/auth" , authRoutes);
app.use("/expense" , expenseRoutes);


app.listen(PORT , () => {
    connectDB();
    console.log(`server listning on ${PORT}`)
})