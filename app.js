const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

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
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

// Routes
const routes = {
  index: require('./routes'),
  expenses: require('./routes/expenses'),
  categories: require('./routes/categories'),
  budgets: require('./routes/budgets')
}

// Open route
app.use('/', routes.index);

// Use auth middleware on all below
app.use(require('./middleware/auth'));

// All other routes
app.use('/expenses', routes.expenses);
app.use('/categories', routes.categories);
app.use('/budgets', routes.budgets);


let port = process.env.PORT || 1101;
app.listen(port, () => void console.log(`App listening on port ${port}`));