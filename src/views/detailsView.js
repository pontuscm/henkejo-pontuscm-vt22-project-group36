const SearchResultsView={
    props: ["drinkData", "isDrinkInMenu", "guests", "onAddToMenu"],
    data(){return {
    }},
    render(){
        const component = this;
        function renderImageAndPriceCB() {
            return <div class="detailsViewImageAndPrice">
                <span>
                    <img class="detailsViewImage" src={component.drinkData.drinks[0].strDrinkThumb + "/preview"}></img>
                </span>
            </div>
        }
    
        function renderIngredientsCB(ingredient) {
            return <tr>
                <td class="detailsViewIngredientName">{ingredient[0]}</td>
                <td class="detailsViewIngredientAmount">{ingredient[1]}</td>
            </tr>
        }
    
        function addToMenuACB(event) {
            component.onAddToMenu()
        }
    
        let ingredient_names = [];
        let ingredient_amounts = [];
        for (let [key, value] of Object.entries(component.drinkData.drinks[0])) {
            if (key.startsWith("strIngredient") && value != null) {
                ingredient_names[key[13] - 1] = value;
                //console.log(value);
            }
            if (key.startsWith("strMeasure") && value != null) {
                ingredient_amounts[key[10] - 1] = value;
                //console.log(value);
            }
        }
        const ingredients_list = {};
        ingredient_names.forEach((element, index) => {
            if (ingredient_amounts[index] == null) {
                ingredients_list[element] = "n/a";
            }
            else {
                ingredients_list[element] = ingredient_amounts[index];
            }
        });
    
        return (
            <div class="detailsView">
                <h2 class="detailsViewTitle">{component.drinkData.drinks[0].strDrink}</h2>
                <button class="addToMenuButton" disabled={component.isDrinkInMenu} onClick={addToMenuACB}>Add to favorites!</button>
                {renderImageAndPriceCB(component)}
                <div class="detailsViewInstructions">
                    {component.drinkData.drinks[0].strAlcoholic}
                </div>
                <div class="detailsViewIngredients">
                    <div>
                        Ingredients:
                    </div>
                    <table>
                        {Object.entries(ingredients_list).map(renderIngredientsCB)}
                    </table>
                </div>
                <div class="detailsViewInstructions">
                    <div>
                        Category:
                    </div>
                    {component.drinkData.drinks[0].strCategory}
                </div>
                <div class="detailsViewInstructions">
                    <div>
                        Glass type:
                    </div>
                    {component.drinkData.drinks[0].strGlass}
                </div>
                <div class="detailsViewInstructions">
                    <div>
                        Instructions:
                    </div>
                    {component.drinkData.drinks[0].strInstructions}
                </div>
            </div>
        )
    }
}

export default SearchResultsView;