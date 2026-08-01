const defaultRecipes = [
    {
        name: "Spaghetti",
        ingredients: "Noodles, tomato sauce, ground beef, and cheese",
        instructions: "Cook the noodles, prepare the sauce, combine everything, and serve."
    },
    {
        name: "Chicken Tacos",
        ingredients: "Chicken, tortillas, lettuce, cheese, and salsa",
        instructions: "Cook the chicken, place it in tortillas, add toppings, and enjoy."
    },
    {
        name: "Pancakes",
        ingredients: "Flour, eggs, milk, sugar, and baking powder",
        instructions: "Mix the ingredients and cook the batter on a skillet."
    }
];

function loadRecipes() {
    const savedRecipes = localStorage.getItem("recipes");

    if (!savedRecipes) {
        return [...defaultRecipes];
    }

    try {
        const parsedRecipes = JSON.parse(savedRecipes);
        return Array.isArray(parsedRecipes) ? parsedRecipes : [...defaultRecipes];
    } catch (error) {
        console.error("Saved recipes could not be loaded.", error);
        return [...defaultRecipes];
    }
}

let recipes = loadRecipes();

document.addEventListener("DOMContentLoaded", function () {
    const loginScreen = document.getElementById("loginScreen");
    const websiteContent = document.getElementById("websiteContent");
    const loginForm = document.getElementById("loginForm");
    const logoutButton = document.getElementById("logoutButton");
    const recipeForm = document.getElementById("recipeForm");
    const recipeList = document.getElementById("recipeList");
    const searchInput = document.getElementById("searchInput");
    const recipeMessage = document.getElementById("recipeMessage");
    const contactForm = document.getElementById("contactForm");
    const contactStatus = document.getElementById("contactStatus");

    function showHomeScreen() {
        if (loginScreen) {
            loginScreen.style.display = "none";
        }

        if (websiteContent) {
            websiteContent.style.display = "block";
        }

        displayRecipes(recipes);
        showRecipeOfTheDay();
    }

    if (
        loginScreen &&
        websiteContent &&
        localStorage.getItem("loggedIn") === "true"
    ) {
        showHomeScreen();
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            if (username.length < 2 || password.length < 2) {
                alert("Enter a username and password with at least two characters.");
                return;
            }

            localStorage.setItem("loggedIn", "true");
            showHomeScreen();
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("loggedIn");

            if (loginScreen) {
                loginScreen.style.display = "grid";
            }

            if (websiteContent) {
                websiteContent.style.display = "none";
            }
        });
    }

    if (recipeForm) {
        recipeForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("recipeName").value.trim();
            const ingredients = document.getElementById("ingredients").value.trim();
            const instructions = document.getElementById("instructions").value.trim();

            if (name.length < 2 || ingredients.length < 5 || instructions.length < 10) {
                recipeMessage.textContent = "Please provide a complete recipe with clear ingredients and instructions.";
                return;
            }

            recipes.push({ name, ingredients, instructions });
            localStorage.setItem("recipes", JSON.stringify(recipes));

            recipeForm.reset();
            recipeMessage.textContent = "Your recipe was added successfully.";
            displayRecipes(recipes);
            showRecipeOfTheDay();
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const searchText = searchInput.value.toLowerCase().trim();

            const filteredRecipes = recipes.filter(function (recipe) {
                return (
                    recipe.name.toLowerCase().includes(searchText) ||
                    recipe.ingredients.toLowerCase().includes(searchText) ||
                    recipe.instructions.toLowerCase().includes(searchText)
                );
            });

            displayRecipes(filteredRecipes);
        });
    }

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("contactName").value.trim();
            const email = document.getElementById("contactEmail").value.trim();
            const topic = document.getElementById("contactTopic").value;
            const message = document.getElementById("contactMessage").value.trim();

            if (name.length < 2 || !email.includes("@") || topic === "" || message.length < 10) {
                contactStatus.textContent = "Please complete every field with valid information.";
                return;
            }

            contactStatus.textContent = "Thank you. Your message was processed for this class demonstration.";
            contactForm.reset();
        });
    }

    function showRecipeOfTheDay() {
        const dailyName = document.getElementById("dailyRecipeName");
        const dailyIngredients = document.getElementById("dailyIngredients");
        const dailyInstructions = document.getElementById("dailyInstructions");

        if (!dailyName || recipes.length === 0) {
            return;
        }

        const today = new Date();
        const dayNumber = Math.floor(
            new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime() /
            86400000
        );

        const dailyRecipe = recipes[dayNumber % recipes.length];

        dailyName.textContent = dailyRecipe.name;
        dailyIngredients.textContent = dailyRecipe.ingredients;
        dailyInstructions.textContent = dailyRecipe.instructions;
    }

    function displayRecipes(recipeArray) {
        if (!recipeList) {
            return;
        }

        recipeList.replaceChildren();

        if (recipeArray.length === 0) {
            const message = document.createElement("p");
            message.textContent = "No recipes were found.";
            recipeList.appendChild(message);
            return;
        }

        recipeArray.forEach(function (recipe) {
            const card = document.createElement("article");
            card.className = "recipe-card";

            const title = document.createElement("h3");
            title.textContent = recipe.name;

            const ingredientText = document.createElement("p");
            const ingredientLabel = document.createElement("strong");
            ingredientLabel.textContent = "Ingredients: ";
            ingredientText.append(ingredientLabel, document.createTextNode(recipe.ingredients));

            const instructionText = document.createElement("p");
            const instructionLabel = document.createElement("strong");
            instructionLabel.textContent = "Instructions: ";
            instructionText.append(instructionLabel, document.createTextNode(recipe.instructions));

            card.append(title, ingredientText, instructionText);
            recipeList.appendChild(card);
        });
    }
});
