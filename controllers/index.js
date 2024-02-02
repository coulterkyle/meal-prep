const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const dashRoutes = require('./dash-routes');
const recipeRoutes = require('./recipe-routes');
const dayRoutes = require('./day-routes');
const weekRoutes = require('./week-routes');

router.use('/recipe', recipeRoutes);
router.use('/day', dayRoutes);
router.use('/week', weekRoutes);
router.use('/dash', dashRoutes);
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;