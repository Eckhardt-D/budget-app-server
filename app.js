const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const authMw = require('./middleware/auth')

// Routes
const indexRoutes = require('./routes');
const expensesRoutes = require('./routes/expenses');
const categoriesRoutes = require('./routes/categories');
const budgetsRoutes = require('./routes/budgets');

const app = express();

// Database connection
mongoose.connect(
  'mongodb://localhost:27017/budget-app', 
  { useNewUrlParser: true }, 
  () => void console.log('DB connection established')
);


// Middlewares
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// Open route
app.use('/', indexRoutes);

// Auth the rest
app.use(authMw);

// The rest
app.use('/expenses', expensesRoutes);
app.use('/categories', categoriesRoutes);
app.use('/budgets', budgetsRoutes);


let port = process.env.PORT || 1101;
app.listen(port, () => void console.log(`App listening on port ${port}`));