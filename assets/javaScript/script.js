var urlCategories = "https://www.themealdb.com/api/json/v1/1/categories.php";
var urlBreweries = "https://api.openbrewerydb.org/breweries/search?query=vancouver";
var urlCards = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
var urlRecipe = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";



// Special Note!  For the card display I temporaily have it hard coded to seafood.
// This will enable Rudy and Christian to have some data to work with until 
// we get the listeners set up.   ~Tami.



function fetchData(requestUrl, requestType) {
    //console.log(requestUrl);
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

function buildCategories(data) {

    for (var i=0; i<14; i++) {

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

    for (var i=0; i<9; i++) {

        var card = document.getElementById("card" + i.toString());

        var img = document.createElement('img');
        img.setAttribute("src", data.meals[i].strMealThumb);
        img.setAttribute("alt", data.meals[i].strMeal);
        card.appendChild(img);

        var span = document.createElement('span');
        span.setAttribute("class", "card-title");
        span.textContent = data.meals[i].strMeal;
        card.appendChild(span);

    }
}

function displayRecipe(recipeID) {
    // Build URL with recipe.  Parm is the ID of whatever the user clicked, for example
    // https://www.themealdb.com/api/json/v1/1/lookup.php?i=52777
    var recipe = urlRecipe + recipeID;
}

// Main: Initial page displayed to user.  Should default page be Beef?
fetchData(urlCategories, "category");
<<<<<<< HEAD

var selectedRecipe = document.querySelector("#recipeCard")
=======
fetchData(urlCards + "seafood", "cards");

>>>>>>> 17fee34264957ff7098ea75ffc3bfe2be123d082
// Need an event listener on the category container
selectedRecipe.addEventListener('click', displayRecipeCards);


// Need another event listener on the 9x9 container

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems,);
  });