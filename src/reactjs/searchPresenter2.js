import SearchFormView from "../views/searchFormView";
import SearchResultsView from "../views/searchResultsView";
import promiseNoData from "../views/promiseNoData.js";
import resolvePromise from "../resolvePromise";
import { getDishDetails, searchDishes } from "../dishSource";

function Search(props) {

    const [searchType, setSearchTypeACB] = React.useState("");
    const [searchQuery, setSearchQueryACB] = React.useState("");
    const [searchResultPromise, setSearchResultPromiseACB] = React.useState();
    const [searchResultData, setSearchResultPromiseDataACB] = React.useState();
    const [searchResultError, setSearchResultPromiseErrorACB] = React.useState();

    function observerACB(){
        setSearchResultPromiseACB(searchDishes({query : "", type : ""}));
    }

    function wasCreatedACB(){
        return props.model.addObserver();
/*         function isTakenDownACB(){
            props.model.removeObserver(observerACB);
        }
        return isTakenDownACB; */
    }

    React.useEffect(wasCreatedACB, []);

    if (searchResultPromise == undefined) {
        setSearchResultPromiseACB(searchDishes({query : "", type : ""}));
        //this.searchResultPromise.then(setSearchResultPromiseDataACB).catch(setSearchResultPromiseErrorACB);
    }

    function onClickSearchButtonACB() {
        setSearchResultPromiseACB(searchDishes({query : searchQuery, type : searchType}));
        searchResultPromise.then(setSearchResultPromiseDataACB).catch(setSearchResultPromiseErrorACB);
        //props.model.doSearch({query : searchQuery, type : searchType});
    }

    function onSelectChangeACB(searchTypeInput) {
        this.setSearchTypeACB(searchTypeInput);
        //props.model.setSearchType(searchTypeInput);
    }

    function onInputChangeACB(searchQueryInput) {
        this.setSearchQueryACB(searchQueryInput);
        //props.model.setSearchQuery(searchQueryInput);
    }

    function onClickedResultACB(searchResult) {
        props.model.setCurrentDish(searchResult.id);
    }

    return <div>
        <SearchFormView 
            dishTypeOptions={["starter", "main course", "dessert"]} 
            onClickSearchButton={onClickSearchButtonACB} 
            onSelectChange={onSelectChangeACB} 
            onInputChange={onInputChangeACB}
        />
        {promiseNoData({promise: searchResultPromise, data: searchResultData, error: searchResultError}) || 
        <SearchResultsView 
            searchResults={searchResultData} 
            onClickedResult={onClickedResultACB}
        />}
    </div>
}

export default Search;