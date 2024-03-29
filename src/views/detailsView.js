const SearchResultsView={
    props: ["drinkData", "isDrinkInMenu", "guests", "onAddToMenu", "onRemoveFromMenu"],
    data(){return {
    }},
    render(){
        const component = this;
        function renderImageCB() {
            return <img class="details-view-image" src={component.drinkData.drinks[0].strDrinkThumb + "/preview"}></img>
        }
    
        function renderIngredientsCB(ingredient) {
            return <tr>
                <td class="detailsViewIngredientName">{ingredient[0]}</td>
                <td class="detailsViewIngredientAmount">{ingredient[1]}</td>
            </tr>
        }
    
        function addToMenuACB() {
            component.onAddToMenu()
        }

        function removeFromMenuACB() {
            component.onRemoveFromMenu()
        }
    
        let ingredient_names = [];
        let ingredient_amounts = [];
        for (let [key, value] of Object.entries(component.drinkData.drinks[0])) {
            if (key.startsWith("strIngredient") && value != null) {
                ingredient_names[key[13] - 1] = value;
            }
            if (key.startsWith("strMeasure") && value != null) {
                ingredient_amounts[key[10] - 1] = value;
            }
        }
        const ingredients_list = {};
        ingredient_names.forEach((element, index) => {
            if (ingredient_amounts[index] == null) {
                ingredients_list[element] = "";
            }
            else {
                ingredients_list[element] = ingredient_amounts[index];
            }
        });

        function favButtonRenderACB() {
            if (component.isDrinkInMenu) {
                return <a href="javascript:void(0);" class="addToMenuButton"
                disabled={component.isDrinkInMenu} onClick={removeFromMenuACB}>
                    <img class="details-star" src="star_on.png"></img>
                </a>
            }else{
                return <a href="javascript:void(0);" class="addToMenuButton"
                disabled={component.isDrinkInMenu} onClick={addToMenuACB}>
                    <img class="details-star" src="star_off.png"></img>
                </a>
            }
        }
        return (
            <div class="detailsView">
                <div class="title-row">
                    <h2 class="detailsViewTitle">{component.drinkData.drinks[0].strDrink}</h2>
                    {
                        favButtonRenderACB()
                    }
                    <a href="/index.html#home"><img class="home-icon-title" src="home_icon.png" width="46" height="46"></img></a>
                <div>
            </div>
                </div>
                <div class="details-image">
                    {renderImageCB()}
                </div>
                <div>
                    <div class="details-subtitle">
                        Ingredients:
                    </div>
                    <table>
                        {Object.entries(ingredients_list).map(renderIngredientsCB)}
                    </table>
                </div>
                <div>
                    <div class="details-subtitle">
                        Category:
                    </div>
                    {component.drinkData.drinks[0].strCategory}
                </div>
                <div>
                    <div class="details-subtitle">
                        Glass type:
                    </div>
                    {component.drinkData.drinks[0].strGlass}
                </div>
                <div>
                    <div class="details-subtitle">
                        Instructions:
                    </div>
                    {component.drinkData.drinks[0].strInstructions}
                </div>
            </div>
        )
    }
}

export default SearchResultsView;