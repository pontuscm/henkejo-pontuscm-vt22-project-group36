import SearchFormView from "../views/searchFormView";
import SearchResultsView from "../views/searchResultsView";

const Search={
    props: ["model"],
    render(){
        const component=this;
        
        function onClickedResultACB(searchResult) {
            this.props.model.setCurrentDrink(searchResult.idDrink);
            window.location.hash="details";
        }

        return <div>
            <SearchFormView/>
            <SearchResultsView 
                searchResults={this.model.searchResultsPromiseState.data}
                onClickedResult={onClickedResultACB}/>
        </div>
    },
};
    

export default Search;