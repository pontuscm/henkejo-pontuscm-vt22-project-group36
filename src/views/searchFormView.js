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
    render(){
        const component=this;

        function onInputChangeACB(searchQueryInput) {
            component.searchQuery = searchQueryInput.target.value;
        }
        
        function onClickSearchButtonACB() {
            component.model.addObserver(onSearchDoneACB);
            component.model.doSearch({
                type: component.searchType,
                query: component.searchQuery
            })
        }

        function onSearchDoneACB() {
            if (component.model.searchResultsPromiseState.data) {
                window.location.hash = "search";
                component.model.removeObserver(onSearchDoneACB)
            } else {
                console.log(component.model.searchResultsPromiseState.error);
            }
        }
        
        return (
            <form class="search-form" onSubmit={(event) => event.preventDefault()}>
                <input type="text" placeholder="Search..." class="search-box" onChange={onInputChangeACB}></input>
                <button type="submit" class="search-submit-btn" onClick={onClickSearchButtonACB}>
                    🔍
                    <i class="fa fa-search"></i>
                </button>
            </form>
        )
    }
}

export default SearchForm;