const router = require('express').Router();
const { json } = require('sequelize');
const { User, Recipe } = require('../../models');


// router.get('/', async (req, res) => {
//   try {
//     let recipeURL = `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=${process.env.APP_ID}&app_key=${process.env.API_KEY}`;
//     let data = await fetch(recipeURL);
//     const newdata = await data.json();
//     console.log('new data', newdata)
//     res.render('recipes', {
//       hits: newdata.hits
//     })
//   } catch (err) {
//     console.log(err)
//     res.status(500).json(err);
//   }
// });


module.exports = router;