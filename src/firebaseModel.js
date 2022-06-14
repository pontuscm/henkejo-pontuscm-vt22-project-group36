import firebaseConfig from "/src/firebaseConfig.js";
import { getDishDetails, searchDishes } from "./dishSource";
import resolvePromise from "./resolvePromise";
import DinnerModel from "./DinnerModel";

firebase.initializeApp(firebaseConfig);
const REF = "dinnerModel10";

function updateFirebaseFromModel(model) {
    console.log("updateFirebaseFromModel");
    console.log(model);
    function myObserverACB(payload) {
        if (payload != undefined) {
            if (payload.setNumOfGuests) {
                if (payload.setNumOfGuests > 0) {
                    firebase.database().ref(REF + "/numberOfGuests").set(model.numberOfGuests);
                }
                else {
                    throw new Error("Number of guests not positive integer.")
                }
            }
            if (payload.setCurrentDishId) {
                firebase.database().ref(REF + "/currentDishId/").set(payload.setCurrentDishId);
            }
            if (payload.addDrink) {
                firebase.database().ref(REF + "/drinkFavorites/" + String(payload.addDrink.idDrink)).set(payload.addDrink.strDrink);
            }
            if (payload.removeDrink) {
                firebase.database().ref(REF + "/drinkFavorites/" + String(payload.removeDrink.idDrink)).set(null);
            }
        }
    }
    model.addObserver(myObserverACB);
}

function updateModelFromFirebase(model) {
    console.log("updateModelFromFirebase");
    console.log(model);
    firebase.database().ref(REF + "/numberOfGuests").on("value",
        function numberOfGuestsChangedInFirebaseACB(firebaseData) {
            if (+firebaseData.val() > 0 && Number.isInteger(+firebaseData.val())) {
                model.setNumberOfGuests(+firebaseData.val());
            }
            else {
                throw new Error("Number of guests not positive integer.")
            }
        }
    );
    firebase.database().ref(REF + "/currentDishId").on("value",
        function currentDishIdChangedInFirebaseACB(firebaseData) {
            model.setCurrentDish(+firebaseData.val());
        }
    );

    firebase.database().ref(REF + "/drinkFavorites").on("child_added",
        function dishAddedFromMenuInFirebaseACB(firebaseData) {
            function compareDishes(drink) {
                if (+drink.idDrink == +firebaseData.key) {
                    return true;
                }
                return false;
            }
            function fetchDishDataBasedOnID(key) {
                return getDishDetails(key);
            }
            if (model.drinkFavorites.find(compareDishes) == undefined) {
                fetchDishDataBasedOnID(+firebaseData.key).then(
                    function addDrinkToModelACB(drinkData) {
                        model.addToMenu(drinkData.drinks[0]);
                    }
                ).catch(
                    function processErrorACB(err) {
                        console.log(err);
                    }
                )
            }
        }
    );
    firebase.database().ref(REF + "/drinkFavorites").on("child_removed",
        function dishRemovedFromMenuInFirebaseACB(firebaseData) {
            model.removeFromMenu({ id: +firebaseData.key });
        }
    );
}

function firebaseModelPromise() {
    function getAllDishesFromFirebasePromiseACB(firebaseData) {
        function createModelACB(drinksArray) {
            return new DinnerModel(+firebaseData.val().numberOfGuests, drinksArray)
        }
        function makeDishPromiseCB(drinkId) {
            return getDishDetails(drinkId);
        }
        if (firebaseData.val() == undefined || firebaseData.val().drinkFavorites == undefined) {
            return new DinnerModel();
        }
        const allDrinksPromiseArray = Object.keys(firebaseData.val().drinkFavorites).map(makeDishPromiseCB);
        return Promise.all(allDrinksPromiseArray).then(createModelACB);
    }
    return firebase.database().ref(REF).once("value").then(getAllDishesFromFirebasePromiseACB);
}

export { updateFirebaseFromModel, updateModelFromFirebase, firebaseModelPromise };