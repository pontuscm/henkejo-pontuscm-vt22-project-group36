import { dishType, sortDishes } from "../utilities";
import { menuPrice } from "../utilities";

function SidebarView(props){
    function minusButtonACB(event){
        props.onNumberChange(props.number - 1)
    }
    
    function plusButtonACB(event){
        props.onNumberChange(props.number + 1)
    }

    function dishesTableRowCB(dish){
        function removeDishACB(event){
            props.onRemoveDish(dish)
        }

        function selectCurrentDishACB(event){
            props.onSelectCurrentDish(dish)
        }

        return <tr key={dish.id}>
            <td class="sidebarRemoveDish"><button onClick={removeDishACB}>x</button></td>
            <td class="sidebarDishName"><a href="#details" onClick={selectCurrentDishACB}>{dish.title}</a></td>
            <td class="sidebarDishType">{dishType(dish)}</td>
            <td class="sidebarDishPrice">{(dish.pricePerServing * props.number).toFixed(2)}</td></tr>
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
                        sortDishes(props.dishes).map(dishesTableRowCB)
                    }
                    <tr>
                        <td class="sidebarSumText">Total: </td>
                        <td></td>
                        <td></td>
                        <td class="sideBarSumTotal">{(menuPrice(props.dishes) * props.number).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}




export default SidebarView;