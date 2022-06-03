
function DetailsView(props) {
    function renderImageAndPriceCB(props) {
        return <div class="detailsViewImageAndPrice">
            <span>
                <img class="detailsViewImage" src={props.dishData.image} height="100"></img>
            </span>
            <span class="detailsViewPrice">
                {"Price: " + props.dishData.pricePerServing.toFixed(2) + " per serving. "}
                {"For " + props.guests + " guests: " + (props.dishData.pricePerServing*props.guests).toFixed(2) + " total."}
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
            <div class="detailsViewTitle">{props.dishData.title}</div>
            {renderImageAndPriceCB(props)}
            <div class="detailsViewIngredients">
                <table>
                    {props.dishData.extendedIngredients.map(renderIngredientsCB)}
                </table>
            </div>
            <div class="detailsViewInstructions">{props.dishData.instructions}</div>
            <a class="detailsViewLink" target="_blank" href={props.dishData.sourceUrl}>More information</a>
        </div>
    )
}

export default DetailsView;
