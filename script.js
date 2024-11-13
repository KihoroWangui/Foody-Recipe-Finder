const API_URL = "https://api.edamam.com/api/recipes/v2?type=public&q=";

document.getElementById("search-button").addEventListener("click", async () => {
  const query = document.getElementById("search-input").value;
  if (!query) {
    alert("Please enter a recipe name");
    return;
  }

  const response = await fetch(
    `${API_URL}${query}&app_id=YOUR_APP_ID&app_key=YOUR_APP_KEY`
  );
  const data = await response.json();

  displayRecipes(data.hits);
});

function displayRecipes(recipes) {
  const resultsContainer = document.getElementById("recipe-results");
  resultsContainer.innerHTML = "";

  if (recipes.length === 0) {
    resultsContainer.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    recipeCard.innerHTML = `
      <h3>${recipe.recipe.label}</h3>
      <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}" />
      <p>Calories: ${Math.round(recipe.recipe.calories)}</p>
      <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
    `;

    resultsContainer.appendChild(recipeCard);
  });
}
