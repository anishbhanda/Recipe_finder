const searchbox = document.querySelector('.searchbox');
const searchbutton = document.querySelector('.searchbutton');
const recipeContainer = document.querySelector('.recipe-container');
const recipeContentDetails = document.querySelector(".recipe-content-details")
const recipeCloseBtn = document.querySelector(".recipe-close-btn")

const fetchRecipes = async (query) => {
    console.log("searching")
    recipeContainer.innerHTML = "<h2>Fetching Recipe...</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    const response = await data.json();
    recipeContainer.innerHTML = "";
    console.log(response.meals[0]);
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p><span>${meal.strArea}</span>Dish</p>
    <p>Belongs to <span>${meal.strCategory}</span> Category</p>
    `
        const button = document.createElement("button");
        button.textContent = "Search Recipe";
        recipeDiv.appendChild(button)
        button.addEventListener("click", () => {
            openRecipePopup(meal);
        });
        recipeContainer.appendChild(recipeDiv);
    })
    console.log("searching completed")
}

searchbutton.addEventListener('click', (event) => {
    event.preventDefault();
    const searchInput = searchbox.value.trim();
    fetchRecipes(searchInput);
});
const fetchIngrdients = (meal) => {
    console.log(meal);
    let IngredentsList = "";
    for (let i = 1; i <= 20; i++) {
        const Ingredents = meal[`strIngredient${i}`];
        if (Ingredents) {
            const measure = meal[`strMeasure${i}`];
            IngredentsList += `<li>${measure} ${Ingredents}</li>`
        }
        else {
            break;
        }
    }
    return IngredentsList;
}

const openRecipePopup = (meal) => {
    recipeContentDetails.innerHTML = `
    <h2>${meal.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul>${fetchIngrdients(meal)}</ul>
    <p><strong>Instructions:-</strong><span class="givingColor">${meal.strInstructions}</span></p>
    `
    recipeContentDetails.parentElement.style.display = "block";
}
recipeCloseBtn.addEventListener("click", close = () => {
    recipeCloseBtn.parentElement.style.display = "none";
});