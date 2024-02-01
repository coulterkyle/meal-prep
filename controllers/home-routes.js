const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');




// GET for homepage
router.get('/', async (req, res) => {
    res.render('homepage', {
        loggedIn: req.session.loggedIn
    })
});

router.get('/register', (req, res) => {

    res.render('register');
  });
  

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
  }
  );

  router.get('/dashboard', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
    //   const userData = await User.findByPk(req.session.user_id, {
    //     attributes: { exclude: ['password'] },
    //     include: [{ model: User }],
    //   });
  
    //   const user = userData.get({ plain: true });
  
      res.render('dashboard', {
        // ...user,
        loggedIn: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  

module.exports = router;
