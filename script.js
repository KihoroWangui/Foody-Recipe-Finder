// API URL (replace 'YOUR_APP_ID' and 'YOUR_APP_KEY' with your actual Edamam API credentials if testing with a real API)
const API_URL = "https://api.edamam.com/api/recipes/v2?type=public&q=";
const APP_ID = "fcbac74b";
const APP_KEY = "98fb1a26a30442da145b0a68fb0b9d56";

// Log to confirm the script is loaded
console.log("JavaScript file is loaded");

// Search button event listener
document.getElementById("search-button").addEventListener("click", async () => {
  console.log("Search button clicked");

  const query = document.getElementById("search-input").value.trim();
  console.log("Search Query:", query);

  if (!query) {
    alert("Please enter a recipe name");
    return;
  }

  try {
    // Fetch recipes from the API
    const response = await fetch(
      `${API_URL}${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );

    if (!response.ok) throw new Error("Failed to fetch data from the API");

    const data = await response.json();
    console.log("Data received from API:", data);

    // Display recipes if data is available
    displayRecipes(data.hits);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    alert(
      "Could not fetch recipes. Please check your API details or try again later."
    );
  }
});

// Function to display recipes
function displayRecipes(recipes) {
  const resultsContainer = document.getElementById("recipe-results");
  resultsContainer.innerHTML = ""; // Clear previous results

  if (recipes.length === 0) {
    resultsContainer.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  recipes.forEach((recipeObj) => {
    const recipe = recipeObj.recipe;

    // Create a recipe card
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    // Recipe card content
    recipeCard.innerHTML = `
      <h3>${recipe.label}</h3>
      <img src="${recipe.image}" alt="${recipe.label}" />
      <p>Calories: ${Math.round(recipe.calories)}</p>
      <a href="${recipe.url}" target="_blank">View Recipe</a>
    `;

    resultsContainer.appendChild(recipeCard);
  });
}

// Mock data for testing without API (Uncomment to test with local data only)
// const sampleData = [
//   {
//     recipe: {
//       label: "Test Recipe",
//       image: "https://via.placeholder.com/150",
//       calories: 250,
//       url: "https://example.com"
//     }
//   },
//   {
//     recipe: {
//       label: "Another Recipe",
//       image: "https://via.placeholder.com/150",
//       calories: 300,
//       url: "https://example.com"
//     }
//   }
// ];
// displayRecipes(sampleData); // Uncomment this line to test with mock data
