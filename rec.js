// ------------------------------
// Recipe Data
// ------------------------------
let recipes = [
    {
        name: "Spaghetti",
        ingredients: "Noodles, tomato sauce, ground beef, cheese",
        instructions:
            "Cook the noodles, prepare the sauce, combine everything, and serve."
    },
    {
        name: "Chicken Tacos",
        ingredients: "Chicken, tortillas, lettuce, cheese, salsa",
        instructions:
            "Cook the chicken, place it in the tortillas, add toppings, and enjoy."
    },
    {
        name: "Pancakes",
        ingredients: "Flour, eggs, milk, sugar, baking powder",
        instructions:
            "Mix the ingredients and cook the batter on a skillet."
    }
];


// ------------------------------
// Wait for the page to load
// ------------------------------
document.addEventListener("DOMContentLoaded", function () {

    const loginScreen = document.getElementById("loginScreen");
    const websiteContent = document.getElementById("websiteContent");
    const recipeList = document.getElementById("recipeList");
    const searchInput = document.getElementById("searchInput");


    // Show the home screen if the user is already logged in
    if (localStorage.getItem("loggedIn") === "true") {

        if (loginScreen) {
            loginScreen.style.display = "none";
        }

        if (websiteContent) {
            websiteContent.style.display = "block";
        }

        displayRecipes(recipes);
    }


    // ------------------------------
    // Login
    // ------------------------------
    window.login = function () {

        const usernameInput =
            document.getElementById("username");

        const passwordInput =
            document.getElementById("password");


        if (!usernameInput || !passwordInput) {
            alert("The login fields could not be found.");
            return;
        }


        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();


        if (username === "" || password === "") {
            alert("Please enter a username and password.");
            return;
        }


        localStorage.setItem("loggedIn", "true");


        if (loginScreen) {
            loginScreen.style.display = "none";
        }


        if (websiteContent) {
            websiteContent.style.display = "block";
        }


        displayRecipes(recipes);
    };


    // ------------------------------
    // Logout
    // ------------------------------
    window.logout = function () {

        localStorage.removeItem("loggedIn");


        if (loginScreen) {
            loginScreen.style.display = "flex";
        }


        if (websiteContent) {
            websiteContent.style.display = "none";
        }


        const usernameInput =
            document.getElementById("username");

        const passwordInput =
            document.getElementById("password");


        if (usernameInput) {
            usernameInput.value = "";
        }


        if (passwordInput) {
            passwordInput.value = "";
        }
    };


    // ------------------------------
    // Add Recipe
    // ------------------------------
    window.addRecipe = function () {

        const nameInput =
            document.getElementById("recipeName");

        const ingredientsInput =
            document.getElementById("ingredients");

        const instructionsInput =
            document.getElementById("instructions");


        if (
            !nameInput ||
            !ingredientsInput ||
            !instructionsInput
        ) {
            alert("The recipe form could not be found.");
            return;
        }


        const name = nameInput.value.trim();

        const ingredients =
            ingredientsInput.value.trim();

        const instructions =
            instructionsInput.value.trim();


        if (
            name === "" ||
            ingredients === "" ||
            instructions === ""
        ) {
            alert("Please fill out every field.");
            return;
        }


        recipes.push({
            name: name,
            ingredients: ingredients,
            instructions: instructions
        });


        nameInput.value = "";
        ingredientsInput.value = "";
        instructionsInput.value = "";


        displayRecipes(recipes);
    };


    // ------------------------------
    // Search Recipes
    // ------------------------------
    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const searchText =
                searchInput.value.toLowerCase().trim();


            const filteredRecipes = recipes.filter(
                function (recipe) {

                    const recipeName =
                        recipe.name.toLowerCase();

                    const recipeIngredients =
                        recipe.ingredients.toLowerCase();


                    return (
                        recipeName.includes(searchText) ||
                        recipeIngredients.includes(searchText)
                    );
                }
            );


            displayRecipes(filteredRecipes);
        });
    }


    // ------------------------------
    // Display Recipes
    // ------------------------------
    function displayRecipes(recipeArray) {

        if (!recipeList) {
            return;
        }


        recipeList.innerHTML = "";


        if (recipeArray.length === 0) {

            recipeList.innerHTML = `
                <p class="no-recipes">
                    No recipes were found.
                </p>
            `;

            return;
        }


        recipeArray.forEach(function (recipe) {

            const card =
                document.createElement("article");


            card.className = "recipe-card";


            const recipeTitle =
                document.createElement("h3");

            recipeTitle.textContent = recipe.name;


            const ingredientsParagraph =
                document.createElement("p");

            const ingredientsLabel =
                document.createElement("strong");

            ingredientsLabel.textContent =
                "Ingredients: ";


            ingredientsParagraph.appendChild(
                ingredientsLabel
            );

            ingredientsParagraph.appendChild(
                document.createTextNode(
                    recipe.ingredients
                )
            );


            const instructionsParagraph =
                document.createElement("p");

            const instructionsLabel =
                document.createElement("strong");

            instructionsLabel.textContent =
                "Instructions: ";


            instructionsParagraph.appendChild(
                instructionsLabel
            );

            instructionsParagraph.appendChild(
                document.createTextNode(
                    recipe.instructions
                )
            );


            card.appendChild(recipeTitle);

            card.appendChild(
                ingredientsParagraph
            );

            card.appendChild(
                instructionsParagraph
            );


            recipeList.appendChild(card);
        });
    }
});
