import resolvePromise from "../resolvePromise";
import { searchDrinks } from "../drinkSource";

const SearchForm = {
    props: ['model'],
    data(){return {
        searchOptions:["Drink name", "Ingredient"],
        searchType:"drink",
        searchQuery:"",
        searchResultsPromiseState: {},
        };
    },
    created(){
        const component=this;
    },
    render(){
        const component=this;

        function onInputChangeACB(searchQueryInput) {
            component.searchQuery = searchQueryInput.target.value;
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
            component.model.addObserver(onSearchDoneACB);
            component.model.doSearch({
                type: component.searchType,
                query: component.searchQuery
            })
        }

        function onSearchDoneACB(payload) {
            if (component.model.searchResultsPromiseState.data) {
                window.location.hash = "search";
            } else {
                console.log(component.model.searchResultsPromiseState.error);
            }
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