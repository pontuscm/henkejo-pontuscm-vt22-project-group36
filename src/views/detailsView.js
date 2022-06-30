
function DetailsView(props) {
    function renderImageAndPriceCB(props) {
        return <div class="detailsViewImageAndPrice">
            <span>
                <img class="detailsViewImage" src={props.drinkData.drinks[0].strDrinkThumb + "/preview"}></img>
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
        props.onAddToMenu()
        window.location.hash = "#home";
    }

    function onCancelButtonClickACB(event) {
        window.location.hash = "#home";
    }
    let ingredient_names = [];
    let ingredient_amounts = [];
    for (let [key, value] of Object.entries(props.drinkData.drinks[0])) {
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
            <button class="addToMenuButton" disabled={props.isDrinkInMenu} onClick={addToMenuACB}>Add to menu!</button>
            <button onClick={onCancelButtonClickACB}>Cancel</button>
            <div class="detailsViewTitle">{props.drinkData.drinks[0].strDrink}</div>
            {renderImageAndPriceCB(props)}
            <div class="detailsViewInstructions">
                {props.drinkData.drinks[0].strAlcoholic}
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
                {props.drinkData.drinks[0].strCategory}
            </div>
            <div class="detailsViewInstructions">
                <div>
                    Glass type:
                </div>
                {props.drinkData.drinks[0].strGlass}
            </div>
            <div class="detailsViewInstructions">
                <div>
                    Instructions:
                </div>
                {props.drinkData.drinks[0].strInstructions}
            </div>
        </div>
    )
}

export default DetailsView;
