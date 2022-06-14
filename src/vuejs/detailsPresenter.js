import promiseNoData from "../views/promiseNoData.js";
import DetailsView from "../views/detailsView.js";

function Details(props) {

    function addToMenuACB() {
        props.model.addToMenu(props.model.currentDishPromiseState.data.drinks[0])
    }

    function filterOutDishCB(drink) {
        return drink.idDrink === props.model.currentDishPromiseState.data.drinks[0].idDrink
    }

    function isDishInMenuCB() {
        return props.model.drinkFavorites.find(filterOutDishCB) !== undefined
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