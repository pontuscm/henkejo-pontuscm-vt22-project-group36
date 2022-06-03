import promiseNoData from "../views/promiseNoData.js";
import DetailsView from "../views/detailsView.js";

function Details(props) {

    function addToMenuACB() {
        props.model.addToMenu(props.model.currentDishPromiseState.data)
    }

    function filterOutDishCB(dish) {
        return dish.id === props.model.currentDishPromiseState.data.id
    }

    function isDishInMenuCB() {
        return props.model.dishes.find(filterOutDishCB) !== undefined
    }

    return promiseNoData(props.model.currentDishPromiseState) || 
    <DetailsView 
        dishData={props.model.currentDishPromiseState.data} 
        isDishInMenu={isDishInMenuCB()} 
        guests={props.model.numberOfGuests} 
        onAddToMenu={addToMenuACB}
    />;
}

export default Details;