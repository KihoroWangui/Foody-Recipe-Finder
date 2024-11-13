// Spoonacular API URL and RapidAPI credentials
const API_URL =
  "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch";
const RAPIDAPI_KEY = "0526c82557msh5ac8eeea4e640cap1431bejsnb164453bd1cf";
const RAPIDAPI_HOST = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";

// Log to confirm the script is loaded
console.log("JavaScript file is loaded");

// Search button event listener
document.getElementById("search-button").addEventListener("click", () => {
  console.log("Search button clicked");

  const query = document.getElementById("search-input").value.trim();
  console.log("Search Query:", query);

  if (!query) {
    alert("Please enter a recipe name");
    return;
  }

  // Call function to fetch recipes from Spoonacular API
  fetchRecipes(query);
});

// Function to fetch recipes from Spoonacular API using XMLHttpRequest
function fetchRecipes(query) {
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.open("GET", `${API_URL}?query=${query}&number=10`);
  xhr.setRequestHeader("x-rapidapi-key", RAPIDAPI_KEY);
  xhr.setRequestHeader("x-rapidapi-host", RAPIDAPI_HOST);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        console.log("Data received from API:", data);

        // Display recipes if data is available
        displayRecipes(data.results);
      } else {
        console.error("Error fetching recipes:", xhr.statusText);
        alert("Could not fetch recipes. Please try again later.");
      }
    }
  };

  xhr.send();
}

// Function to display recipes
function displayRecipes(recipes) {
  const resultsContainer = document.getElementById("recipe-results");
  resultsContainer.innerHTML = ""; // Clear previous results

  if (!recipes || recipes.length === 0) {
    resultsContainer.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  recipes.forEach((recipe) => {
    // Create a recipe card
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    // Recipe card content
    recipeCard.innerHTML = `
      <h3>${recipe.title}</h3>
      <img src="${recipe.image}" alt="${recipe.title}" />
      <a href="https://spoonacular.com/recipes/${recipe.title.replace(
        / /g,
        "-"
      )}-${recipe.id}" target="_blank">View Recipe</a>
    `;

    resultsContainer.appendChild(recipeCard);
  });
}

// Mock data for testing without API (Uncomment to test with local data only)
// const sampleData = [
//   {
//     title: "Test Recipe",
//     image: "https://via.placeholder.com/150",
//     id: 12345
//   },
//   {
//     title: "Another Recipe",
//     image: "https://via.placeholder.com/150",
//     id: 67890
//   }
// ];
// displayRecipes(sampleData); // Uncomment this line to test with mock data
