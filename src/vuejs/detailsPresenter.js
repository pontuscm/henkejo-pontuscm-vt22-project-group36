import SearchFormView from "../views/searchFormView";
import SearchResultsView from "../views/searchResultsView";
import promiseNoData from "../views/promiseNoData.js";
import resolvePromise from "../resolvePromise";
import DetailsView from "../views/detailsView";

const Home={
    props: ["model"],
    data(){return {
    }},
    render(){
        const component = this;
        function addToMenuACB() {
            component.model.addToMenu(component.model.currentDrinkPromiseState.data.drinks[0])
        }
    
        function filterOutDrinkCB(drink) {
            return drink.idDrink === component.model.currentDrinkPromiseState.data.drinks[0].idDrink
        }
    
        function isDrinkInMenuCB() {
            return component.model.drinkFavorites.find(filterOutDrinkCB) !== undefined
        }

        return promiseNoData(component.model.currentDrinkPromiseState) || 
        <DetailsView 
            drinkData={component.model.currentDrinkPromiseState.data} 
            isDrinkInMenu={isDrinkInMenuCB()} 
            guests={component.model.numberOfGuests} 
            onAddToMenu={addToMenuACB}
        />;
    },
};
    

export default Home;