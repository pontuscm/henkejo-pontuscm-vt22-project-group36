const knownTypes=[                    
    "Ordinary Drink", 
    "Cocktail", 
    "Shake",
    "Other/Unknown",
    "Cocoa",
    "Shot",
    "Coffee / Tea",
    "Homemade Liqueur",
    "Punch / Party Drink",
    "Beer",
    "Soft Drink"
];

function compareDishTypeCB(dishA, dishB){
    if (knownTypes.indexOf(dishA.strCategory) < knownTypes.indexOf(dishB.strCategory)) {
        return -1
    }
    else if (knownTypes.indexOf(dishA.strCategory) > knownTypes.indexOf(dishB.strCategory)) {
        return 1
    } else {
        return 0
    }
}

function sortDishes(drinkFavorites){
    const sortedDrinkFavorites = [...drinkFavorites]
    return sortedDrinkFavorites.sort(compareDishTypeCB)
}

/* 
    Callback function for comparing ingredients
 */
function compareIngredientsCB(ingredientA, ingredientB){
    if (ingredientA.aisle < ingredientB.aisle) {
        return -1
    }
    else if (ingredientA.aisle > ingredientB.aisle) {
        return 1
    } else {
        if (ingredientA.name < ingredientB.name) {
            return -1
        } else if(ingredientA.name > ingredientB.name){
            return 1
        }  
        else{
            return 0
        }
    }
}

function sortIngredients(ingredients){
    // TODO
    //const sortedIngredients = [...ingredients]
    //return sortedIngredients.sort(compareIngredientsCB)
    return ingredients
}

function shoppingList(drinkFavorites){
    return ["just to return something", "ingredient1", "ingredient2", "ingredient3"];
}

function menuPrice(drinksArray){
    return 666;
}

export {sortDishes, sortIngredients, shoppingList, menuPrice};

