const router = require('express').Router();
const { User, Recipe } = require('../../models');

//gets data from edamam api
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


module.exports = router;