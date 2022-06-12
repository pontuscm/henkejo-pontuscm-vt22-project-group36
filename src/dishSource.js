import { BASE_URL,API_KEY } from "./apiConfig";

function treatHTTPResponseACB(response){
    if(response.status !== 200) {
        throw new Error('HTTP != 200');
    } else {
        return response.json();
    }
}

function transformResultACB(response) {
    //console.log(response);
    return response;
}

function getDishDetails(params) {
    console.log(BASE_URL+"lookup.php?i="+params);
    return fetch(
        BASE_URL+"lookup.php?i="+params, 
        {
            "method": "GET",
            "headers": {}
        }
    ).then(treatHTTPResponseACB);
}

function searchDishes(params) {
    let searchParams = new URLSearchParams(params);
    console.log(BASE_URL+"search.php?s="+searchParams.get("query").toString());
    return fetch(
        BASE_URL+"search.php?s="+searchParams.get("query").toString(), 
        {
            "method": "GET",
            "headers": {},
        }
    ).then(treatHTTPResponseACB).then(transformResultACB);
}

export {searchDishes,getDishDetails};