import SearchFormView from "../views/searchFormView";
import SearchResultsView from "../views/searchResultsView";
import promiseNoData from "../views/promiseNoData.js";
import resolvePromise from "../resolvePromise";
import { searchDrinks } from "../drinkSource";

const Search={
    props: ["model"],
    data(){ return {
        };
    },
    created(){
        const component=this;
    },
    render(){
        const component=this;
    
        return <div>
            <SearchFormView
                searchOptions={[
                    "Drink name",
                    "Ingredient"
                ]} 
                onClickSearchButton={onClickSearchButtonACB} 
                onSelectChange={onSelectChangeACB} 
                onInputChange={onInputChangeACB}/>
                <div class="heading">
                <div class="welcome-text">
                    Welcome to PocketCocktail!
                </div>
            </div>
            <div class="favorites-list">
                <div class="favs-heading">
                    ⭐️ Saved drinks:
                </div>
                <ul class="fav-ul">
                    <a href="#"><li>Mojito</li></a>
                    <a href="#"><li>Mojito</li></a>
                    <a href="#"><li>Mojito</li></a>
                </ul>
            </div>
        </div>
    },
};
    

export default Search;