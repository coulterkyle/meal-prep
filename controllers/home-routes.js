const router = require('express').Router();
const { User, Recipe } = require('../models');
const withAuth = require('../utils/auth');


// GET for Homepage
router.get('/', async (req, res) => {
  res.render('homepage', {
    loggedIn: req.session.loggedIn,
    active: {home: true}
  })
});

// GET for Register page
router.get('/register', (req, res) => {

  res.render('register', {active: {register: true }});
});

// GET for rendering Login page - redirects to mymeals upon completion
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect('/mymeals');
    return;
  }

  res.render('login', {active: {login: true }});
}
);

// GET for rendering Dashboard page
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    res.render('dashboard', {
      loggedIn: req.session, 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET for Recipes search
router.get('/recipes/:search', async (req, res) => {

  let recipeURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${req.params.search}&app_id=${process.env.APP_ID}&app_key=${process.env.API_KEY}`;
  let data = await fetch(recipeURL);
  const newdata = await data.json();
  let hits = newdata.hits

  res.render('recipes', {
    loggedIn: req.session.loggedIn,
    hits: hits,
    active: {recipes: true },
  })
});

// Displays Recipes page in handlebars
router.get('/recipes', async (req, res) => {

  res.render('recipes', {
    loggedIn: req.session.loggedIn,
    active: {recipes: true },
  })
});

//GET route for mymeals page
router.get('/mymeals', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Recipe }],
    });

    const user = userData.get({ plain: true });

    //renders my meals page with data received from the database
    res.render('mymeals', {
      ...user,
      loggedIn: true,
      active: {mymeals: true }
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Displays myshoppinglist page in handlebars
router.get('/myshoppinglist', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Recipe }],
    });

    const user = userData.get({ plain: true });

    //renders my meals page with data received from the database
    res.render('myshoppinglist', {
      ...user,
      loggedIn: true,
      active: {shoppinglist: true }
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
