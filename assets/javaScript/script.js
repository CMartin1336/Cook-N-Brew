var urlCategories = "https://www.themealdb.com/api/json/v1/1/categories.php";
var urlBreweries = "https://api.openbrewerydb.org/breweries/search?query=vancouver";
var urlCards = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
var urlRecipe = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

function fetchData(requestUrl, requestType) {
    console.log(requestUrl);
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
    console.log(data);
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

function displayRecipeCards(catID) {
    // Build URL with category user clicked on as the c=xxxxxx parm, for example
    // https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
    // Randomly select 9
    var card = urlCards + catID;
}

function displayRecipe(recipeID) {
    // Build URL with recipe.  Parm is the ID of whatever the user clicked, for example
    // https://www.themealdb.com/api/json/v1/1/lookup.php?i=52777
    var recipe = urlRecipe + recipeID;
}

// Main: Initial page displayed to user.  Should default page be Beef?
console.log("Am I here")
fetchData(urlCategories, "category");

var selectedRecipe = document.querySelector("#recipeCard")
// Need an event listener on the category container
selectedRecipe.addEventListener('click', displayRecipeCards);


// Need another event listener on the 9x9 container
