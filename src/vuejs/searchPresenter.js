import SearchFormView from "../views/searchFormView";
import SearchResultsView from "../views/searchResultsView";
import promiseNoData from "../views/promiseNoData.js";
import resolvePromise from "../resolvePromise";
import { searchDishes } from "../dishSource";

const Search={   // ordinary JS object literal, can have methods like render()
    props: ["model"],
    data(){ return { 
        searchType:"", 
        searchQuery:"", 
        searchResultsPromiseState: {},
        };
    },
    created(){
        const component=this; 
        lifecycle: resolvePromise(searchDishes({type: component.searchType, query: component.searchQuery}), component.searchResultsPromiseState);
    },
    render(){
        const component=this;
        function onClickSearchButtonACB() {
            resolvePromise(searchDishes({type: component.searchType, query: component.searchQuery}), component.searchResultsPromiseState);
            window.location.hash="search";
        }
    
        function onSelectChangeACB(searchTypeInput) {
            component.searchType = searchTypeInput;
        }
    
        function onInputChangeACB(searchQueryInput) {
            component.searchQuery = searchQueryInput;
        }
    
        function onClickedResultACB(searchResult) {
            component.model.setCurrentDish(searchResult.id);
            window.location.hash="details";
        }
    
        return <div>
            <SearchFormView
                dishTypeOptions={["starter", "main course", "dessert"]} 
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