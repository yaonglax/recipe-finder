const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/recipes', async (req, res) => {
  const { mealTitle, ingrQuantity, cuisineType, mealType } = req.query;
  const app_id = '8afe80f2';
  const app_key = 'd0a8e28c4c4c18b92d807b8dcd6cb2e5';

  try {
    const fetch = await import('node-fetch').then(mod => mod.default);
    const req = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${mealTitle}&app_id=8afe80f2&app_key=d0a8e28c4c4c18b92d807b8dcd6cb2e5&ingr=${ingrQuantity}&cuisineType=${cuisineType}&mealType=${mealType}`)
    const data = await apiRes.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Edamam API' });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
