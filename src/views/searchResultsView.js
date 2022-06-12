function SearchResultsView(props) {
    function renderSearchResultCB(searchResult) {
        function onClickedResultACB() {
            props.onClickedResult(searchResult)
            window.location.hash="#details";
        }
        return <span onClick={onClickedResultACB} class="searchResult">
            <div>{searchResult.strDrink}</div>
            <img src={searchResult.strDrinkThumb} height="100"></img>
        </span>
    }
    return (
        <div>
            {props.searchResults.drinks.map(renderSearchResultCB)}
        </div>
    );
}

export default SearchResultsView;