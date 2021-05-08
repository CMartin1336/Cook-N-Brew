var catContainerEl = document.querySelector('#catContainer');  
var cardContainerEl = document.querySelector('#cardContainer');  
var breweryContainerEl = document.querySelector('#btnBrewery');  

var urlCategories = "https://www.themealdb.com/api/json/v1/1/categories.php";
var urlBreweries = "https://api.openbrewerydb.org/breweries/search?query=";
var urlCards = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
var urlRecipe = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

// Fetch data from API's
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
            displayBreweries(data);
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

// Handle clicks for brewery
function breweryClickHandler(event) {
     localStorage.setItem("breweryCity", city.value);
     var requrl = urlBreweries + city.value;
     fetchData(requrl,"brewery");
}

// Display Breweries in the modal 
function displayBreweries(data) {
    var tableBody = document.getElementById("tblBody");
     tableBody.innerHTML = "";

     for (var i = 0; i<4; i++){

          var breweryObj = data[i];    
          var address = data[i].street + ", " + data[i].state + " " + data[i].postal_code;
          var tblTR = document.createElement("tr");
          var tblTDName = document.createElement("td");
          var tblTDAddress = document.createElement("td");
          
          tblTDName.textContent = data[i].name;
          tblTDAddress.textContent = address;

          tblTR.appendChild(tblTDName);
          tblTR.appendChild(tblTDAddress);
          tableBody.appendChild(tblTR);
     }
}

// Display food categories, leaving out ones that had a small number of recipes 
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

// Display recipe cards 3x3 in main container
function displayRecipeCards(data) {

     for (var i = 0; i < 9; i++) {
               var img = document.getElementById("img" + i.toString());
               img.setAttribute("src", data.meals[i].strMealThumb);
               img.setAttribute("alt", data.meals[i].strMeal);

               var parent = document.getElementById("card" + i.toString()).parentElement;
               parent.setAttribute("id", data.meals[i].idMeal);

               var span = document.getElementById("cardspan" + i.toString());
               span.textContent = data.meals[i].strMeal;

               var button = document.getElementById("button" + i.toString());
               button.setAttribute("data-card", data.meals[i].idMeal);
     }
}

// Clear out the container between each recipe view
function clearRecipeIngredients(parent) {
     while (parent.firstChild) {
          parent.removeChild(parent.firstChild);
      }
  }

// Display the recipe
function displayRecipe(data) {

     mealObj = data.meals[0];
     var measure = [];
     var ingredient = [];
     var i=0;
     var j=0;
     var ingredients = document.querySelector('#ingredients');

     clearRecipeIngredients(ingredients);

     var cardContainer = document.getElementById('cardContainer');
     var recipeContainer = document.getElementById('recipeContainer');
     cardContainer.classList.add("hidden");
     recipeContainer.classList.remove("hidden")
     
     var name = document.getElementById("recipeName");
     name.textContent = mealObj.strMeal;

     var img = document.getElementById("recipeImg");
     img.setAttribute("src", mealObj.strMealThumb);
     img.setAttribute("alt", mealObj.strMeal);
     
     for (x in mealObj) {
          if (x.includes("strIngredient") && mealObj[x] !== null  && mealObj[x] !== "" && mealObj[x] !== " "  ) {
               ingredient[i] = mealObj[x];
               i++;
          } else if (x.includes("strMeasure") && mealObj[x] !== null  && mealObj[x] !== ""  && mealObj[x] !== " ") {
               measure[j] = mealObj[x];
               j++;
          }
     }
     for (var k=0; k< measure.length; k++) {
          var strIngredient = measure[k] + " " + ingredient[k];
          var p = document.createElement('p');
          p.textContent = strIngredient;
          ingredients.appendChild(p);
     }
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

// Listeners 
catContainerEl.addEventListener('click', categoryClickHandler);
cardContainerEl.addEventListener('click', cardClickHandler)
breweryContainerEl.addEventListener('click', breweryClickHandler)