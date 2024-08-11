const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let recipes = [];


app.get('/recipes', (req, res) => {
    res.json(recipes);
});

app.post('/recipes', (req, res) => {
    const newRecipe = { id: recipes.length + 1, ...req.body };
    recipes.push(newRecipe);
    res.status(201).json(newRecipe);
});

app.put('/recipes/:id', (req, res) => {
    const { id } = req.params;
    recipes = recipes.map(recipe => recipe.id == id ? { ...recipe, ...req.body } : recipe);
    res.json(recipes.find(recipe => recipe.id == id));
});

app.delete('/recipes/:id', (req, res) => {
    const { id } = req.params;
    recipes = recipes.filter(recipe => recipe.id != id);
    res.status(204).send();
});


app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
