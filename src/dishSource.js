import { BASE_URL,API_KEY } from "./apiConfig";

function treatHTTPResponseACB(response){
    /*TODO throw if the HTTP response is not 200, otherwise return response.json()*/
    if(response.status !== 200) {
        throw new Error('HTTP != 200');
    } else {
        return response.json();
    }
}

function getDishDetails(params) {
    
    return fetch(BASE_URL+'recipes/'+params+'/information', {  // object literal
        "method": "GET",              // HTTP method
        "headers": {                  // HTTP headers, also object literal
     'X-Mashape-Key': API_KEY,
    "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
     } // end of headers object
    }/* end of second fetch parameter, object */
    ).then(treatHTTPResponseACB);
}

function transformResultACB(response) {
    return response.results;
}

function searchDishes(params) {
    let searchParams = new URLSearchParams(params);
    searchParams.toString();
    return fetch(BASE_URL+'recipes/search?'+searchParams.toString(), {  // object literal
        "method": "GET",              // HTTP method
        "headers": {                  // HTTP headers, also object literal
     'X-Mashape-Key': API_KEY,
    "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
     } // end of headers object
    }/* end of second fetch parameter, object */
    ).then(treatHTTPResponseACB).then(transformResultACB);

}


export {searchDishes,getDishDetails};