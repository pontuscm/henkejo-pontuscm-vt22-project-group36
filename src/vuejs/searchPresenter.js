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
            <div class="home-icon">
                <a href="/index.html#home"><img src="home_icon.png" width="30" height="30"></img></a>
            </div>
            <SearchResultsView 
                model={this.model}
                onClickedResult={onClickedResultACB}/>
        </div>
    },
};
    

export default Search;