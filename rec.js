// ------------------------------
// Default Recipe Data
// ------------------------------
const defaultRecipes = [
    {
        name: "Spaghetti",
        ingredients:
            "Noodles, tomato sauce, ground beef, and cheese",
        instructions:
            "Cook the noodles, prepare the sauce, combine everything, and serve."
    },
    {
        name: "Chicken Tacos",
        ingredients:
            "Chicken, tortillas, lettuce, cheese, and salsa",
        instructions:
            "Cook the chicken, place it in the tortillas, add toppings, and enjoy."
    },
    {
        name: "Pancakes",
        ingredients:
            "Flour, eggs, milk, sugar, and baking powder",
        instructions:
            "Mix the ingredients and cook the batter on a skillet."
    },
    {
        name: "Grilled Cheese",
        ingredients:
            "Bread, cheese, and butter",
        instructions:
            "Butter the bread, add cheese, and cook both sides in a skillet until golden."
    },
    {
        name: "Chicken Alfredo",
        ingredients:
            "Chicken, fettuccine noodles, Alfredo sauce, and Parmesan cheese",
        instructions:
            "Cook the chicken and noodles, warm the sauce, combine everything, and serve."
    },
    {
        name: "Chocolate Chip Cookies",
        ingredients:
            "Flour, sugar, butter, eggs, baking soda, and chocolate chips",
        instructions:
            "Mix the ingredients, form the dough into small portions, and bake until golden."
    },
    {
        name: "Garden Salad",
        ingredients:
            "Lettuce, tomatoes, cucumbers, carrots, cheese, and salad dressing",
        instructions:
            "Wash and cut the vegetables, combine them in a bowl, and add dressing."
    }
];


// Load saved recipes, or use the default list
let recipes = loadRecipes();


// ------------------------------
// Load Recipes
// ------------------------------
function loadRecipes() {
    const savedRecipes =
        localStorage.getItem("recipes");

    if (savedRecipes) {
        try {
            return JSON.parse(savedRecipes);
        } catch (error) {
            console.error(
                "The saved recipe data could not be read.",
                error
            );
        }
    }

    return defaultRecipes;
}


// ------------------------------
// Save Recipes
// ------------------------------
function saveRecipes() {
    localStorage.setItem(
        "recipes",
        JSON.stringify(recipes)
    );
}


// ------------------------------
// Wait for the Page to Load
// ------------------------------
document.addEventListener(
    "DOMContentLoaded",
    function () {

        const loginScreen =
            document.getElementById("loginScreen");

        const websiteContent =
            document.getElementById("websiteContent");

        const recipeList =
            document.getElementById("recipeList");

        const searchInput =
            document.getElementById("searchInput");

        const dailyRecipeName =
            document.getElementById("dailyRecipeName");

        const dailyIngredients =
            document.getElementById("dailyIngredients");

        const dailyInstructions =
            document.getElementById(
                "dailyInstructions"
            );


        // ------------------------------
        // Stay Logged In
        // ------------------------------
        if (
            localStorage.getItem("loggedIn") ===
            "true"
        ) {
            showHomeScreen();
        }


        // ------------------------------
        // Login
        // ------------------------------
        window.login = function () {
            const usernameInput =
                document.getElementById("username");

            const passwordInput =
                document.getElementById("password");


            if (
                !usernameInput ||
                !passwordInput
            ) {
                alert(
                    "The login fields could not be found."
                );

                return;
            }


            const username =
                usernameInput.value.trim();

            const password =
                passwordInput.value.trim();


            if (
                username === "" ||
                password === ""
            ) {
                alert(
                    "Please enter a username and password."
                );

                return;
            }


            localStorage.setItem(
                "loggedIn",
                "true"
            );

            showHomeScreen();
        };


        // ------------------------------
        // Logout
        // ------------------------------
        window.logout = function () {
            localStorage.removeItem("loggedIn");

            if (loginScreen) {
                loginScreen.style.display =
                    "flex";
            }

            if (websiteContent) {
                websiteContent.style.display =
                    "none";
            }

            const usernameInput =
                document.getElementById(
                    "username"
                );

            const passwordInput =
                document.getElementById(
                    "password"
                );

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
                document.getElementById(
                    "recipeName"
                );

            const ingredientsInput =
                document.getElementById(
                    "ingredients"
                );

            const instructionsInput =
                document.getElementById(
                    "instructions"
                );


            if (
                !nameInput ||
                !ingredientsInput ||
                !instructionsInput
            ) {
                alert(
                    "The recipe form could not be found."
                );

                return;
            }


            const name =
                nameInput.value.trim();

            const ingredients =
                ingredientsInput.value.trim();

            const instructions =
                instructionsInput.value.trim();


            if (
                name === "" ||
                ingredients === "" ||
                instructions === ""
            ) {
                alert(
                    "Please fill out every field."
                );

                return;
            }


            recipes.push({
                name: name,
                ingredients: ingredients,
                instructions: instructions
            });


            saveRecipes();


            nameInput.value = "";

            ingredientsInput.value = "";

            instructionsInput.value = "";


            if (searchInput) {
                searchInput.value = "";
            }


            displayRecipes(recipes);

            showRecipeOfTheDay();
        };


        // ------------------------------
        // Search Recipes
        // ------------------------------
        if (searchInput) {
            searchInput.addEventListener(
                "input",
                function () {

                    const searchText =
                        searchInput.value
                            .toLowerCase()
                            .trim();


                    const filteredRecipes =
                        recipes.filter(
                            function (recipe) {

                                const recipeName =
                                    recipe.name
                                        .toLowerCase();

                                const ingredients =
                                    recipe.ingredients
                                        .toLowerCase();

                                const instructions =
                                    recipe.instructions
                                        .toLowerCase();


                                return (
                                    recipeName.includes(
                                        searchText
                                    ) ||
                                    ingredients.includes(
                                        searchText
                                    ) ||
                                    instructions.includes(
                                        searchText
                                    )
                                );
                            }
                        );


                    displayRecipes(
                        filteredRecipes
                    );
                }
            );
        }


        // ------------------------------
        // Show the Home Screen
        // ------------------------------
        function showHomeScreen() {
            if (loginScreen) {
                loginScreen.style.display =
                    "none";
            }

            if (websiteContent) {
                websiteContent.style.display =
                    "block";
            }

            displayRecipes(recipes);

            showRecipeOfTheDay();
        }


        // ------------------------------
        // Recipe of the Day
        // ------------------------------
        function showRecipeOfTheDay() {
            if (recipes.length === 0) {
                return;
            }


            const today = new Date();

            const dateNumber =
                Math.floor(
                    new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate()
                    ).getTime() /
                    86400000
                );


            const recipeIndex =
                dateNumber % recipes.length;

            const dailyRecipe =
                recipes[recipeIndex];


            if (dailyRecipeName) {
                dailyRecipeName.textContent =
                    dailyRecipe.name;
            }

            if (dailyIngredients) {
                dailyIngredients.textContent =
                    dailyRecipe.ingredients;
            }

            if (dailyInstructions) {
                dailyInstructions.textContent =
                    dailyRecipe.instructions;
            }
        }


        // ------------------------------
        // Display Recipes
        // ------------------------------
        function displayRecipes(
            recipeArray
        ) {
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


            recipeArray.forEach(
                function (recipe) {

                    const card =
                        document.createElement(
                            "article"
                        );


                    card.className =
                        "recipe-card";


                    const title =
                        document.createElement(
                            "h3"
                        );

                    title.textContent =
                        recipe.name;


                    const ingredientsParagraph =
                        document.createElement(
                            "p"
                        );

                    const ingredientsLabel =
                        document.createElement(
                            "strong"
                        );

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
                        document.createElement(
                            "p"
                        );

                    const instructionsLabel =
                        document.createElement(
                            "strong"
                        );

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


                    card.appendChild(title);

                    card.appendChild(
                        ingredientsParagraph
                    );

                    card.appendChild(
                        instructionsParagraph
                    );


                    recipeList.appendChild(
                        card
                    );
                }
            );
        }
    }
);
