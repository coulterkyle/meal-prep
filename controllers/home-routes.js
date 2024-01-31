const router = require('express').Router();


// GET for homepage
router.get('/', async (req, res) => {
    res.render('homepage', {
        loggedIn: req.session.loggedIn
    })
});

module.exports = router;
