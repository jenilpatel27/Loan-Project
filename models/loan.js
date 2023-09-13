const mongoose = require('mongoose');

// Loan schema
const loanSchema = mongoose.Schema({
  loan: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Loan = module.exports = mongoose.model('Loans', loanSchema);