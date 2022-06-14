import SidebarView from "../views/sidebarView.js";

export default
    function Sidebar(props) {
    function numberChangeACB(nr) {
        props.model.setNumberOfGuests(nr)
    }

    function removeDrinkACB(drink) {
        props.model.removeFromMenu(drink)
    }

    function selectCurrentDrinkACB(drink) {
        props.model.setCurrentDrink(drink.idDrink)
    }

    return <SidebarView
        number={props.model.numberOfGuests}
        onNumberChange={numberChangeACB}
        drinkFavorites={props.model.drinkFavorites}
        onRemoveDrink={removeDrinkACB}
        onSelectCurrentDrink={selectCurrentDrinkACB} />;
}