const SearchResultsView={
    props: ["model"],
    data(){return {
    }},
    render(){
        const component=this;
        function renderSearchResultCB(searchResult) {
            function onClickedResultACB() {
                component.model.addObserver(onDetailsFetchedACB);
                component.model.setCurrentDrink(searchResult.idDrink);
            }
            function onDetailsFetchedACB() {
                window.location.hash="#details";
                component.model.removeObserver(onDetailsFetchedACB);
            }
            return <span onClick={onClickedResultACB} class="searchResult">
                <p><a href="javascript:void(0);">{searchResult.strDrink}</a></p>
            </span>
        }
        return (
            <div>
                <h3 class="results-title">Search results:</h3>
                <ul class="search-results">
                {
                this.model.searchResultsPromiseState.data.drinks.map(renderSearchResultCB)
                }
                </ul>
            </div>
        );
    }
}

export default SearchResultsView;