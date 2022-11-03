import { BASE_URL, API_KEY } from "./apiConfig";

function treatHTTPResponseACB(response){
    if(response.status !== 200) {
        throw new Error('HTTP != 200');
    } else {
        return response.json();
    }
}

function transformResultACB(response) {
    return response;
}

function getDrinkDetails(params) {
    return fetch(
        BASE_URL+"lookup.php?i="+params, 
        {
            "method": "GET",
            "headers": {}
        }
    ).then(treatHTTPResponseACB);
}

function searchDrinks(params) {
    let searchParams = new URLSearchParams(params);
    let searchType = searchParams.get("type").toString() == "drink"
                      ? "search.php?s=" : "filter.php?i=";
    return fetch(
        BASE_URL+
        searchType+
        searchParams.get("query").toString(), 
        {
            "method": "GET",
            "headers": {},
        }
    ).then(treatHTTPResponseACB).then(transformResultACB);
}

export {searchDrinks, getDrinkDetails};