const router = require('express').Router();
// const { json } = require('sequelize');
const { User, Recipe } = require('../../models');


//WHY SEND THIS DATA BACK TO THE FRONT END? COMMIT IT TO THE DATABASE FROM THE BACKEND
router.post('/', async (req, res) => {
  try {
    const encodedUri = encodeURIComponent(req.body.search)
    let recipeUri = `https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=${encodedUri}&app_id=${process.env.APP_ID}&app_key=${process.env.API_KEY}`;
    let data = await fetch(recipeUri);
    const newData = await data.json();
    const newEntry = await Recipe.create({
      recipe_name: newData.hits[0].recipe.label,
      recipe_thumbnail: newData.hits[0].recipe.images.REGULAR.url,
      recipe_ingredients: newData.hits[0].recipe.ingredientLines,
      recipe_calories: newData.hits[0].recipe.calories,
      recipe_instructions: newData.hits[0].recipe.source,
      user_id: req.session.user_id,
    })
    res.status(200).json(newEntry)
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const recipeData = await Recipe.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!recipeData) {
      res.status(404).json({ message: 'No recipe found with this id!' });
      return;
    }

    res.status(200).json(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.post('/', async (req, res) => {
//   try {
//     const newProject = await Recipe.create({
//       ...req.body,
//     });

//     res.status(200).json(newProject);
//   } catch (err) {
//     res.status(400).json(err);
//   }
//   console.log('got it back')

// });


module.exports = router;