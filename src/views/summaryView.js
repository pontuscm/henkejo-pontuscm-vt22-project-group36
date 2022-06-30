import {sortIngredients} from "../utilities.js";

function SummaryView(props){
    function onClickBackToSearchACB(event){
        window.location.hash = "#home";
    }

    return (
            <div class="summary">
                Summary for <span title="nr guests">{props.people}</span> {props.people == 1 ? "person" : "people"}.
                <button class="searchButtons" onClick={onClickBackToSearchACB}>Back to search</button>
                {
                    renderIngredients(props.ingredients, props.people)
                }
            </div>
    );
}

function renderIngredients(ingredientArray, people){
    function ingredientTableRowCB(ingr){
        return <tr key={ingr.id}>
            <td class="summaryName">{ingr.name}</td>
            <td class="summaryAisle">{ingr.aisle}</td>
            <td class="summaryQuantity">{(ingr.amount * people).toFixed(2)}</td>
            <td class="summaryUnit">{ingr.unit}</td></tr>;
    }
        
    return <table>
        <thead>
        <tr>
            <th class="summaryName">Name</th>
            <th class="summaryAisle">Aisle</th>
            <th class="summaryQuantity">Quantity</th>
            <th class="summaryUnit">unit</th>
        </tr>
        </thead>
        <tbody>
        {
            sortIngredients(ingredientArray).map(ingredientTableRowCB)
        }3

        </tbody>
        </table>;
}

export default SummaryView;
export {renderIngredients};
