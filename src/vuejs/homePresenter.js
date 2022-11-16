import SearchFormView from "../views/searchFormView";
import SearchResultsView from "../views/searchResultsView";
import promiseNoData from "../views/promiseNoData.js";
import resolvePromise from "../resolvePromise";

const Home={
    props: ["model"],
    data(){
        return {
            favorites: []
        }
    },
    render(){
        const component=this;

        function renderFavDrinkCB(drink) {
            function onFavClickedACB() {
                component.model.addObserver(onDetailsFetchedACB);
                component.model.setCurrentDrink(drink.idDrink);
            }
            function onDetailsFetchedACB() {
                window.location.hash="#details";
                component.model.removeObserver(onDetailsFetchedACB);
            }
            return <a href="javascript:void(0);" onClick={onFavClickedACB} class="searchResult"><li>
                {drink.strDrink}
            </li></a>
        }

        return <div>
            <div class="heading">
                <div class="welcome-text">
                    Welcome to PocketCocktail!
                </div>
            </div>
            <div class="favorites-list">
                <div class="favs-heading">
                    ⭐️ Saved drinks:
                </div>
                <ul class="fav-ul">
                    {component.model.drinkFavorites.map(renderFavDrinkCB)}
                </ul>
            </div>
        </div>
    },
};
    

export default Home;