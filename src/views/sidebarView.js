import { drinkType, sortDrinks } from "../utilities";
import { menuPrice } from "../utilities";

function SidebarView(props){
    function minusButtonACB(event){
        props.onNumberChange(props.number - 1)
    }
    
    function plusButtonACB(event){
        props.onNumberChange(props.number + 1)
    }

    function drinksTableRowCB(drink){
        function removeDrinkACB(event){
            props.onRemoveDrink(drink)
        }

        function selectCurrentDrinkACB(event){
            props.onSelectCurrentDrink(drink)
        }

        return <tr key={drink.idDrink}>
            <td class="sidebarRemoveDrink"><button onClick={removeDrinkACB}>x</button></td>
            <td class="sidebarDrinkName"><a href="#details" onClick={selectCurrentDrinkACB}>{drink.strDrink}</a></td>
            <td class="sidebarDrinkType">{drink.strCategory}</td>
            {/* <td class="sidebarDrinkPrice">{(drink.pricePerServing * props.number).toFixed(2)}</td> */}
            </tr>
    }

    return (
        <div class="sidebar">
            <button class="sidebarButton" disabled={props.number < 2} onClick={minusButtonACB}>
                -
            </button>
            {props.number}
            <button class="sidebarButton" onClick={plusButtonACB}>
                +
            </button>
            
            <table class="tableContainer">
                <tbody>
                    {
                        sortDrinks(props.drinkFavorites).map(drinksTableRowCB)
                    }
                    {/* <tr>
                        <td class="sidebarSumText">Total: </td>
                        <td></td>
                        <td></td>
                        <td class="sideBarSumTotal">{(menuPrice(props.drinkFavorites) * props.number).toFixed(2)}</td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    )
}




export default SidebarView;