import SearchFormView from "../views/searchFormView";
import SearchResultsView from "../views/searchResultsView";
import promiseNoData from "../views/promiseNoData.js";
import resolvePromise from "../resolvePromise";

const Home={
    props: ["model"],
    data(){return {
    }},
    render(){
        const component=this;
        return <div>
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
    

export default Home;