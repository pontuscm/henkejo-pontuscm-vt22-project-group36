
function DetailsView(props) {
    function renderImageAndPriceCB(props) {
        return <div class="detailsViewImageAndPrice">
            <span>
                <img class="detailsViewImage" src={props.dishData.drinks[0].strDrinkThumb + "/preview"}></img>
            </span>
        </div>
    }

    function renderIngredientsCB(ingredient) {
        return <tr>
            <td class="detailsViewIngredientName">{ingredient.name}</td>
            <td class="detailsViewIngredientAmount">{ingredient.amount.toFixed(2)}</td>
            <td>{ingredient.unit}</td>
        </tr>
    }

    function addToMenuACB(event) {
        props.onAddToMenu()
        window.location.hash = "#search";
    }

    function onCancelButtonClickACB(event) {
        window.location.hash = "#search";
    }

    return (
        <div class="detailsView">
            <button class="addToMenuButton" disabled={props.isDishInMenu} onClick={addToMenuACB}>Add to menu!</button>
            <button onClick={onCancelButtonClickACB}>Cancel</button>
            <div class="detailsViewTitle">{props.dishData.drinks[0].strDrink}</div>
            {renderImageAndPriceCB(props)}
            <div class="detailsViewIngredients">
                <div>Place for ingredients list, only first added as example:</div>
                <tr>
                    <td class="detailsViewIngredientName">{props.dishData.drinks[0].strIngredient1}</td>
                    <td class="detailsViewIngredientAmount">{props.dishData.drinks[0].strMeasure1}</td>
                </tr>
            </div>
            <div class="detailsViewInstructions">{props.dishData.drinks[0].strInstructions}</div>
        </div>
    )
}

export default DetailsView;
