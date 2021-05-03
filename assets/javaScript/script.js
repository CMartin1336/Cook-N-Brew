var urlCategories = "https://www.themealdb.com/api/json/v1/1/categories.php";
var urlBreweries = "https://api.openbrewerydb.org/breweries/search?query=vancouver";
var urlCards = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
var urlRecipe = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";



// Special Note!  For the card display I temporaily have it hard coded to seafood.
// This will enable Rudy and Christian to have some data to work with until 
// we get the listeners set up.   ~Tami.



function fetchData(requestUrl, requestType) {
     console.log(requestUrl);
     fetch(requestUrl)
          .then(function (response) { return response.json() })
          .then(function (data) {
               if (requestType === "category") {
                    buildCategories(data);
               } else if (requestType === "cards") {
                    displayRecipeCards(data);
               } else if (requestType === "recipe") {
                    displayRecipie(data);
               } else {
                    // create brewery function to display results in the modal
               }
          })
}

function buildCategories(data) {

     for (var i = 0; i < 14; i++) {

          var p = document.createElement('p');
          p.textContent = data.categories[i].strCategory;
          catContainer.appendChild(p);

          var img = document.createElement('img');
          img.setAttribute("src", data.categories[i].strCategoryThumb);
          img.setAttribute("data-category", data.categories[i].idCategory);
          img.setAttribute("alt", data.categories[i].strCategory)
          catContainer.appendChild(img);
     }
}

function displayRecipeCards(data) {

     for (var i = 0; i < 9; i++) {

          // Set the image for each card
          var card = document.getElementById("card" + i.toString());
          var img = document.createElement('img');
          img.setAttribute("src", data.meals[i].strMealThumb);
          img.setAttribute("alt", data.meals[i].strMeal);
          card.appendChild(img);

          // Set the recipe ID on each card
          var parent = document.getElementById("card" + i.toString()).parentElement;
          parent.setAttribute("id", data.meals[i].idMeal);
          console.log(parent);

          // Set the recipe name for each card
          var cardContent = document.getElementById("content" + i.toString());
          var span = document.createElement('span');
          span.textContent = data.meals[i].strMeal;
          cardContent.appendChild(span);
     }
}

function displayRecipie(data) {

     mealObj = data.meals[0];
     var measure = [];
     var ingredient = [];
     var i=0;
     var j=0;
     
     // Display recipe name
     var name = document.getElementById("recipeName");
     name.textContent = mealObj.strMeal;

     // Display recipe Image
     var img = document.getElementById("recipeImg");
     img.setAttribute("src", mealObj.strMealThumb);
     img.setAttribute("alt", mealObj.strMeal);
     
     // Display ingredients (Loop through object to find them all)
     for (x in mealObj) {
          if (x.includes("strIngredient") && mealObj[x] !== null  && mealObj[x] !== ""  ) {
               ingredient[i] = mealObj[x];               
               i++;
          } else if (x.includes("strMeasure") && mealObj[x] !== null  && mealObj[x] !== ""  ) {
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
     var instructions = document.getElementById("instructions");
     p = document.createElement('p');
     p.textContent = mealObj.strInstructions;
     instructions.appendChild(p);

     // Display link to you tube
     var youtube = document.getElementById("youtubelink");
     youtube.setAttribute("href", mealObj.strYoutube);    
     youtube.textContent = mealObj.strYoutube; 
}


// --------------------------------------------------------------------
// Main: Initial page displayed to user. Hardcoded till we get listener
// --------------------------------------------------------------------
fetchData(urlCategories, "category");
fetchData(urlCards + "seafood", "cards");
fetchData(urlRecipe + "52773", "recipe");

// --------------------------------------------------------------------
// Event Listeners / Modal
// --------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
     var elems = document.querySelectorAll('.modal');
     var instances = M.Modal.init(elems,);
   });