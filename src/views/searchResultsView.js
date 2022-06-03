function SearchResultsView(props) {
    function renderSearchResultCB(searchResult) {
        function onClickedResultACB() {
            props.onClickedResult(searchResult)
            window.location.hash="#details";
        }

        return <span onClick={onClickedResultACB} class="searchResult">
            <img src={"https://spoonacular.com/recipeImages/"+searchResult.image} height="100"></img>
            <div>{searchResult.title}</div>
        </span>
    }

    return (
        <div>
            {props.searchResults.map(renderSearchResultCB)}
        </div>
    );
}

export default SearchResultsView;