const SearchResultsView={
    props: ["model"],
    render(){
        function renderSearchResultCB(searchResult) {
            function onClickedResultACB() {
                props.onClickedResult(searchResult)
                window.location.hash="#details";
            }
            return <span onClick={onClickedResultACB} class="searchResult">
                <div>{searchResult.strDrink}</div>
                <img src={searchResult.strDrinkThumb + "/preview"} height="100"></img>
            </span>
        }
        try {
            this.searchResults.drinks.map(renderSearchResultCB)
        } catch (e){
            
        }
        return (
            <div>
                {
                this.searchResults.drinks.map(renderSearchResultCB)
                }
            </div>
        );
    }
}

export default SearchResultsView;