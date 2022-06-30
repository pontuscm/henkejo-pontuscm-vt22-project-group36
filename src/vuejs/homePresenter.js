import SearchFormView from "../views/searchFormView";
import SearchResultsView from "../views/searchResultsView";
import promiseNoData from "../views/promiseNoData.js";
import resolvePromise from "../resolvePromise";
import { searchDrinks } from "../drinkSource";

const Home={
    props: ["model"],
    data(){ return { 
        searchType:"", 
        searchQuery:"", 
        searchResultsPromiseState: {},
        };
    },
    created(){
        const component=this; 
        lifecycle: resolvePromise(searchDrinks({type: component.searchType, query: component.searchQuery}), component.searchResultsPromiseState);
    },
    render(){
        const component=this;
        function onClickSearchButtonACB() {
            resolvePromise(searchDrinks({type: component.searchType, query: component.searchQuery}), component.searchResultsPromiseState);
            window.location.hash="search";
        }
    
        function onSelectChangeACB(searchTypeInput) {
            component.searchType = searchTypeInput;
        }
    
        function onInputChangeACB(searchQueryInput) {
            component.searchQuery = searchQueryInput;
        }
    
        function onClickedResultACB(searchResult) {
            component.model.setCurrentDrink(searchResult.idDrink);
            window.location.hash="details";
        }
    
        return <div>
            <SearchFormView
                drinkTypeOptions={[
                    "Ordinary Drink", 
                    "Cocktail", 
                    "Shake",
                    "Other/Unknown",
                    "Cocoa",
                    "Shot",
                    "Coffee / Tea",
                    "Homemade Liqueur",
                    "Punch / Party Drink",
                    "Beer",
                    "Soft Drink"
                ]} 
                onClickSearchButton={onClickSearchButtonACB} 
                onSelectChange={onSelectChangeACB} 
                onInputChange={onInputChangeACB}/>
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
                    <a href="#"><li>Mojito</li></a>
                    <a href="#"><li>Mojito</li></a>
                    <a href="#"><li>Mojito</li></a>
                </ul>
            </div>
        </div>
    },
};
    

export default Home;