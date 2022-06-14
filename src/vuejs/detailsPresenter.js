import promiseNoData from "../views/promiseNoData.js";
import DetailsView from "../views/detailsView.js";

function Details(props) {

    function addToMenuACB() {
        props.model.addToMenu(props.model.currentDrinkPromiseState.data.drinks[0])
    }

    function filterOutDrinkCB(drink) {
        return drink.idDrink === props.model.currentDrinkPromiseState.data.drinks[0].idDrink
    }

    function isDrinkInMenuCB() {
        return props.model.drinkFavorites.find(filterOutDrinkCB) !== undefined
    }

    return promiseNoData(props.model.currentDrinkPromiseState) || 
    <DetailsView 
        drinkData={props.model.currentDrinkPromiseState.data} 
        isDrinkInMenu={isDrinkInMenuCB()} 
        guests={props.model.numberOfGuests} 
        onAddToMenu={addToMenuACB}
    />;
}

export default Details;