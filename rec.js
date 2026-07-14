let recipes = [
    {
        name: "Spaghetti",
        ingredients: "Noodles, tomato sauce, ground beef, cheese",
        instructions: "Cook noodles, make the sauce, mix together, and serve."
    },
    {
        name: "Chicken Tacos",
        ingredients: "Chicken, tortillas, lettuce, cheese, salsa",
        instructions: "Cook the chicken, place it in tortillas, and add toppings."
    },
    {
        name: "Pancakes",
        ingredients: "Flour, eggs, milk, sugar, baking powder",
        instructions: "Mix the ingredients and cook the batter on a skillet."
    }
];

document.addEventListener("DOMContentLoaded", function () {
    const loginScreen = document.getElementById("loginScreen");
    const websiteContent = document.getElementById("websiteContent");
    const recipeList = document.getElementById("recipeList");
    const searchInput = document.getElementById("searchInput");

    // Show the home screen if the user already logged in
    if (localStorage.getItem("loggedIn") === "true") {
        loginScreen.style.display = "none";
        websiteContent.style.display = "block";
        displayRecipes(recipes);
    }

    function displayRecipes(recipeArray) {
        recipeList.innerHTML = "";

        recipeArray.forEach(function (recipe) {
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

    searchInput.addEventListener("input", function () {
        const searchText = searchInput.value.toLowerCase();

        const filteredRecipes = recipes.filter(function (recipe) {
            return recipe.name.toLowerCase().includes(searchText);
        });

        displayRecipes(filteredRecipes);
    });

    // Makes this function available to the HTML login button
    window.login = function () {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (username === "" || password === "") {
            alert("Please enter a username and password.");
            return;
        }

        localStorage.setItem("loggedIn", "true");

        loginScreen.style.display = "none";
        websiteContent.style.display = "block";

        displayRecipes(recipes);
    };

    // Makes this function available to the HTML logout button
    window.logout = function () {
        localStorage.removeItem("loggedIn");

        loginScreen.style.display = "flex";
        websiteContent.style.display = "none";

        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    };

    // Makes this function available to the Add Recipe button
    window.addRecipe = function () {
        const name = document.getElementById("recipeName").value.trim();
        const ingredients = document.getElementById("ingredients").value.trim();
        const instructions = document.getElementById("instructions").value.trim();

        if (name === "" || ingredients === "" || instructions === "") {
            alert("Please fill out all fields.");
            return;
        }

        recipes.push({
            name: name,
            ingredients: ingredients,
            instructions: instructions
        });

        document.getElementById("recipeName").value = "";
        document.getElementById("ingredients").value = "";
        document.getElementById("instructions").value = "";

        displayRecipes(recipes);
    };
});
