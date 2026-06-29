let recipes = [
  {
    name: "Spaghetti",
    ingredients: "Noodles, tomato sauce, ground beef, cheese",
    instructions: "Cook noodles, make sauce, mix together, and serve."
  },
  {
    name: "Chicken Tacos",
    ingredients: "Chicken, tortillas, lettuce, cheese, salsa",
    instructions: "Cook chicken, place in tortillas, add toppings, and enjoy."
  },
  {
    name: "Pancakes",
    ingredients: "Flour, eggs, milk, sugar, baking powder",
    instructions: "Mix ingredients, pour batter on skillet, and cook both sides."
  }
];

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "" || password === "") {
    alert("Please enter a username and password.");
    return;
  }

  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("websiteContent").style.display = "block";

  displayRecipes(recipes);
}

function logout() {
  document.getElementById("loginScreen").style.display = "flex";
  document.getElementById("websiteContent").style.display = "none";

  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

const recipeList = document.getElementById("recipeList");

function displayRecipes(recipeArray) {
  recipeList.innerHTML = "";

  recipeArray.forEach(function(recipe) {
    const card = document.createElement("div");
    card.className = "recipe-card";

    card.innerHTML = `
      <h3>${recipe.name}</h3>
      <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
      <p><strong>Instructions:</strong> ${recipe.instructions}</p>
    `;

    recipeList.appendChild(card);
  });
}

function addRecipe() {
  const name = document.getElementById("recipeName").value;
  const ingredients = document.getElementById("ingredients").value;
  const instructions = document.getElementById("instructions").value;

  if (name === "" || ingredients === "" || instructions === "") {
    alert("Please fill out all fields.");
    return;
  }

  const newRecipe = {
    name: name,
    ingredients: ingredients,
    instructions: instructions
  };

  recipes.push(newRecipe);

  document.getElementById("recipeName").value = "";
  document.getElementById("ingredients").value = "";
  document.getElementById("instructions").value = "";

  displayRecipes(recipes);
}

document.getElementById("searchInput").addEventListener("input", function() {
  const searchText = this.value.toLowerCase();

  const filteredRecipes = recipes.filter(function(recipe) {
    return recipe.name.toLowerCase().includes(searchText);
  });

  displayRecipes(filteredRecipes);
});
