var catContainerEl = document.querySelector('#catContainer');  
var cardContainerEl = document.querySelector('#cardContainer');  

var urlCategories = "https://www.themealdb.com/api/json/v1/1/categories.php";
var urlBreweries = "https://api.openbrewerydb.org/breweries/search?query=vancouver";
var urlCards = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
var urlRecipe = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

function fetchData(requestUrl, requestType) {
    fetch(requestUrl)
    .then(function(response) { return response.json() })
    .then(function(data) { 
        if (requestType === "category") {
            buildCategories(data);
        } else if (requestType === "cards") {
            displayRecipeCards(data);
        } else if (requestType === "recipe") {
            displayRecipe(data);
        } else {
            // create brewery function to display results in the modal
        }
    })
}

// Handle clicks on categories (i.e. beef, chicken, etc.)
function categoryClickHandler(event) {
     cardContainer.classList.remove("hidden");
     recipeContainer.classList.add("hidden")
     var category = event.target.getAttribute('data-category');
     var requrl = urlCards + category;
     fetchData(requrl, "cards");
}

// Handle clicks on recipe cards
function cardClickHandler(event) {
     var button = event.target.getAttribute('data-card');
     var requrl = urlRecipe + button;
     fetchData(requrl, "recipe");
}

function buildCategories(data) {

     for (var i = 0; i < 14; i++) {

          if (data.categories[i].strCategory !== "Pasta" &&
                data.categories[i].strCategory !== "Starter" &&
                data.categories[i].strCategory !== "Vegan" &&
                data.categories[i].strCategory !== "Breakfast" &&
                data.categories[i].strCategory !== "Goat") {

               var p = document.createElement('p');
               p.textContent = data.categories[i].strCategory;
               catContainer.appendChild(p);

               var img = document.createElement('img');
               img.setAttribute("src", data.categories[i].strCategoryThumb)
               img.setAttribute("data-category", data.categories[i].strCategory);
               catContainer.appendChild(img);
          }
     }
}

function displayRecipeCards(data) {
     
     for (var i = 0; i < 9; i++) {
          
               // Set the image on each card
               var img = document.getElementById("img" + i.toString());
               img.setAttribute("src", data.meals[i].strMealThumb);
               img.setAttribute("alt", data.meals[i].strMeal);

               // Set the recipe ID on each card
               var parent = document.getElementById("card" + i.toString()).parentElement;
               parent.setAttribute("id", data.meals[i].idMeal);

               // Set the recipe name for each card
               var span = document.getElementById("cardspan" + i.toString());
               span.textContent = data.meals[i].strMeal;

               // Set recipe ID on button
               var button = document.getElementById("button" + i.toString());
               button.setAttribute("data-card", data.meals[i].idMeal);
     }
}

function clearRecipeIngredients(parent) {
     while (parent.firstChild) {
          parent.removeChild(parent.firstChild);
      }
  }

function displayRecipe(data) {

     mealObj = data.meals[0];
     var measure = [];
     var ingredient = [];
     var i=0;
     var j=0;

     // Clear ingredients
     var ingredients = document.querySelector('#ingredients');
     clearRecipeIngredients(ingredients);

     // Hide card container, display recipe container
     var cardContainer = document.getElementById('cardContainer');
     var recipeContainer = document.getElementById('recipeContainer');
     cardContainer.classList.add("hidden");
     recipeContainer.classList.remove("hidden")
     
     // Display recipe name
     var name = document.getElementById("recipeName");
     name.textContent = mealObj.strMeal;

     // Display recipe Image
     var img = document.getElementById("recipeImg");
     img.setAttribute("src", mealObj.strMealThumb);
     img.setAttribute("alt", mealObj.strMeal);
     
     // Display ingredients (Loop through object to find them all)
     for (x in mealObj) {
          if (x.includes("strIngredient") && mealObj[x] !== null  && mealObj[x] !== "" && mealObj[x] !== " "  ) {
               ingredient[i] = mealObj[x];
               i++;
          } else if (x.includes("strMeasure") && mealObj[x] !== null  && mealObj[x] !== ""  && mealObj[x] !== " ") {
               measure[j] = mealObj[x];
               j++;
          }
     }
     // Join the measurement and ingredient together 
     for (var k=0; k< measure.length; k++) {
          var strIngredient = measure[k] + " " + ingredient[k];
          var p = document.createElement('p');
          p.textContent = strIngredient;
          ingredients.appendChild(p);
     }

     // Display instructions
     var pinstructions = document.getElementById("instructions");
     pinstructions.textContent = mealObj.strInstructions;
}

// --------------------------------------------------------------------
// Main: Display desserts on the way in
// --------------------------------------------------------------------

fetchData(urlCategories, "category");
fetchData(urlCards + "dessert", "cards");

// Modal for brewery button
document.addEventListener('DOMContentLoaded', function() {
     var elems = document.querySelectorAll('.modal');
     var instances = M.Modal.init(elems,);
   });

// Listener for category clicks (i.e. chicken, beef, etc.)
catContainerEl.addEventListener('click', categoryClickHandler);

// Listener for clicks to display recipes from the cards
cardContainerEl.addEventListener('click', cardClickHandler)