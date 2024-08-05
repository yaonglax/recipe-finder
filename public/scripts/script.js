import { categories } from "./categories.js";

const submitBtn = document.querySelector('.main__cont-button');
const recipeContainer = document.querySelector('.main__recipe')

async function getrecipe(event) {
    event.preventDefault();
    const mealTitle = document.getElementsByName('meal-title')[0].value;
    const ingrQuantity = document.getElementsByName('ingr-quantity')[0].value;
    const mealType = document.getElementsByName('meal-type')[0].value;
    const cuisineType = document.getElementsByName('cuisine-type')[0].value
    console.log('mealTitle:', mealTitle);
    console.log('ingrQuantity:', ingrQuantity);
    console.log('mealType:', mealType);
    console.log('cuisineType:', cuisineType);
    const req = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${mealTitle}&app_id=8afe80f2&app_key=d0a8e28c4c4c18b92d807b8dcd6cb2e5&ingr=${ingrQuantity}&cuisineType=${cuisineType}&mealType=${mealType}`)
    console.log(req)
    recipeContainer.innerHTML = ''
    const response = await req.json();
   
    if (response.hits && response.hits.length > 0) {
        recipeContainer.innerHTML = ` 
        <h2 class="main__recipe-label"></h2>
            <h3>Ингредиенты</h3>
            <ul class="main__recipe-list"></ul>
            <img src="" alt="recipe-img" class="main__recipe-img">`
        const ingrList = document.querySelector('.main__recipe-list');
        const recipeImg = document.querySelector('.main__recipe-img');
        const recipeLabel = document.querySelector('.main__recipe-label');
        ingrList.innerHTML = '';
        const randRecipe = Math.floor(Math.random() * (response.to - response.from) + response.from)
        const ingredients = response.hits[randRecipe].recipe.ingredients;
        ingredients.forEach(item => {
            const li = document.createElement('li');
            const category = item.foodCategory.toLowerCase();
            console.log('food: ', item.foodCategory)
            if (category in categories) {
                li.innerHTML = `<img class='li-img' src=${categories[category]} alt='li-img' /> ${item.text}`
                console.log(categories[category])
            }
            ingrList.appendChild(li);
        });
        recipeImg.src = response.hits[randRecipe].recipe.images.SMALL.url;
        recipeLabel.textContent = response.hits[randRecipe].recipe.label
        console.log(response.hits[randRecipe].recipe)

    }
    else {
        recipeContainer.innerHTML = `<div class="main__recipe-cont">
           <img src="./icons/recipe.svg" alt="" class="main__recipe-img--empty">
           <h2>Ещё нет рецепта...</h2>
                </div>`
    }
    
}

submitBtn.addEventListener('click', getrecipe);
document.addEventListener('DOMContentLoaded', function () {
    var inputs = document.querySelectorAll('.input-text');
    inputs.forEach(function (input) {
        input.addEventListener('input', function () {
            this.style.backgroundColor = 'transparent';
        });
    });
});

