import resolvePromise from "../resolvePromise";
import { searchDrinks } from "../drinkSource";

const SearchForm = {
    props: [],
    data(){return {
        searchOptions:["Drink name", "Ingredient"],
        searchType:"drink",
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
        function onInputChangeACB(event) {
            component.searchQuery = searchQueryInput;
        }
        
        function onSelectChangeACB(event) {
            if(searchTypeInput == "Drink name") {
                component.searchType = "drink"
            }
            else if (searchTypeInput == "Ingredient") {
                component.searchType = "ingredient"
            }
            else(
                component.searchType = "drink"
                )
            }
        
        function onClickSearchButtonACB() {
            resolvePromise(searchDrinks({type: component.searchType, query: component.searchQuery}), component.searchResultsPromiseState,
            () => {window.location.hash = "search"});
        }
        
        function onSelectChangeACB(searchTypeInput) {
            if(searchTypeInput == "Drink name") {
                component.searchType = "drink"
            }
            else if (searchTypeInput == "Ingredient") {
                component.searchType = "ingredient"
            }
            else{
                component.searchType = "drink"
            }
        }
            
        function onInputChangeACB(searchQueryInput) {
            component.searchQuery = searchQueryInput;
        }
            
                
        function searchOptionsCB(drinkOption) {
            return <option value={drinkOption}>{drinkOption}</option>
        }
        return (
            <form class="search-form" onSubmit={(event) => event.preventDefault()}>
                <input type="text" placeholder="Search..." class="search-box" onChange={onInputChangeACB}></input>
                <select class="searchButtons" name="searchOptions" onChange={onSelectChangeACB}>
                    {component.searchOptions.map(searchOptionsCB)}
                </select>
                <input type="submit" class="search-submit-btn" onClick={onClickSearchButtonACB}>
                    <i class="fa fa-search"></i>
                </input>
            </form>
        )
    }
}

export default SearchForm;