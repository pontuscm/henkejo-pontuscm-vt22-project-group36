const SearchResultsView={
    props: ["model"],
    data(){return {
    }},
    render(){
        const component=this;
        if (this.model.searchResultsPromiseState === undefined) {
            return {}
        }
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
            this.model.searchResultsPromiseState.data.drinks.map(renderSearchResultCB)
        } catch (e){
            
        }
        return (
            <div>
                {
                this.model.searchResultsPromiseState.data.drinks.map(renderSearchResultCB)
                }
            </div>
        );
    }
}

export default SearchResultsView;