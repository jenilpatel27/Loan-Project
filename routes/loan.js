const express = require('express');
const router = express.Router();

// Loan model
const Loan = require('../models/loan');

// new loan form
router.get('/add', function(req, res){
  res.render('add_loan', {
    title: 'Add Loan'
  });
});

// submit new loan 
router.post('/add', function(req, res){
  // Express validator
  req.checkBody('loan', 'Loan Name is required').notEmpty();
  req.checkBody('amount', 'Amount is required').notEmpty();
  req.checkBody('description', 'description is required').notEmpty();
  
  // Get errors
  let errors = req.validationErrors();

  if(errors){
    res.render('add_loan', {
      title: 'Add Loan',
      errors: errors
    });
  } else {
    let loan1 = new Loan();
    loan1.loan = req.body.loan;
    loan1.amount = req.body.amount;
    loan1.description = req.body.description;

    loan1.save(function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        req.flash('success', 'Loan Added');
        res.redirect('/');
      }
    });
  }
});

// load edit form
router.get('/edit/:id', function(req, res){
  Loan.findById(req.params.id, function(err, loan){
    res.render('edit_loan', {
      title: 'Edit Loan',
      loan: loan
    });
  });
});

// update submit new loan 
router.post('/edit/:id', function(req, res){
  let loan = {};
  loan.loan = req.body.loan;
  loan.amount = req.body.amount;
  loan.description = req.body.description;

  let query = {_id: req.params.id};

  Loan.update(query, loan, function(err){
    if(err) {
      console.error(err);
      return;
    } else {
      req.flash('success', 'Loan Updated');
      res.redirect('/');
    }
  })
});

// Delete post
router.delete('/:id', function(req, res){
  let query = {_id: req.params.id};

  Loan.remove(query, function(err){
    if(err) {
      console.error(err);
      return;
    } else {
      req.flash('success', 'Loan Deleted')
      res.send('Success');
    }
  });
});

// get single loan
router.get('/:id', function(req, res){
  Loan.findById(req.params.id, function(err, loan){
    res.render('loan', {
      loan: loan
    });
  });
});

module.exports = router;