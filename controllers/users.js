var Video = require('../models/user');
module.exports.controller = function(app) {

/**
 * a home page route
 */
  app.get('/list', function(req, res) {
      // any logic goes here
      res.render('users/list')
  });

/**
 * About page route
 */
  app.get('/login', function(req, res) {
      // any logic goes here
      res.render('users/login')
  });

}