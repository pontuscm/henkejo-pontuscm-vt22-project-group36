import { BASE_URL,API_KEY } from "./apiConfig";

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
    return fetch(
        BASE_URL+"search.php?s="+searchParams.get("query").toString(), 
        {
            "method": "GET",
            "headers": {},
        }
    ).then(treatHTTPResponseACB).then(transformResultACB);
}

export {searchDrinks, getDrinkDetails};