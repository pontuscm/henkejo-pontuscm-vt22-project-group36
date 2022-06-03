import {sortIngredients} from "../utilities.js";

/* Functional JSX component. Name starts with capital letter */
function SummaryView(props){
    function onClickBackToSearchACB(event){
        window.location.hash = "#search";
    }

    return (
            <div class="summary">
                Summary for <span title="nr guests">{props.people}</span> {props.people == 1 ? "person" : "people"}.
                <button class="searchButtons" onClick={onClickBackToSearchACB}>Back to search</button>
            
                {  //  <---- we are in JSX; with this curly brace, we go back to JavaScript, and can write JS code and comments.
                   // Then we can come back to JSX <tags>
            
                   // TODO uncomment this at TW1.5, it won't work before because props.ingredinets is not set.
                    renderIngredients(props.ingredients, props.people)
                }
            </div>
    );
}

/* For TW1.5. If you are at TW1.2, wait :) */
/* This is an ordinary JS function, not a component. It will be invoked from the component above */
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

        {  //  <---- we are in JSX, with this curly brace, we go back to JavaScript
            sortIngredients(ingredientArray).map(ingredientTableRowCB)
            // TODO sort the ingredients. Import the needed function from utilities.js 
        }

        </tbody>
        </table>;
}

export default SummaryView;
export {renderIngredients};   // we export so that tests can analyze the source code
