import SearchFormView from "../views/searchFormView";
import SearchResultsView from "../views/searchResultsView";
import promiseNoData from "../views/promiseNoData.js";
import resolvePromise from "../resolvePromise";
import { searchDrinks } from "../drinkSource";

const Search={
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
            {promiseNoData(component.searchResultsPromiseState) || 
            <SearchResultsView 
                searchResults={component.searchResultsPromiseState.data} 
                onClickedResult={onClickedResultACB}/>}
        </div>
    },
};
    

export default Search;