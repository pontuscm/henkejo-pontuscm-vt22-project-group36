import firebaseConfig from "/src/firebaseConfig.js";
import { getDrinkDetails, searchDrinks } from "./drinkSource";
import resolvePromise from "./resolvePromise";
import DrinksModel from "./DrinksModel";

firebase.initializeApp(firebaseConfig);
const REF = "DrinksModel";

function updateFirebaseFromModel(model) {
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
            if (payload.setCurrentDrinkId) {
                firebase.database().ref(REF + "/currentDrinkId/").set(payload.setCurrentDrinkId);
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
    firebase.database().ref(REF + "/currentDrinkId").on("value",
        function currentDrinkIdChangedInFirebaseACB(firebaseData) {
            model.setCurrentDrink(+firebaseData.val());
        }
    );

    firebase.database().ref(REF + "/drinkFavorites").on("child_added",
        function drinkAddedFromMenuInFirebaseACB(firebaseData) {
            function compareDrinks(drink) {
                if (+drink.idDrink == +firebaseData.key) {
                    return true;
                }
                return false;
            }
            function fetchDrinkDataBasedOnID(key) {
                return getDrinkDetails(key);
            }
            if (model.drinkFavorites.find(compareDrinks) == undefined) {
                fetchDrinkDataBasedOnID(+firebaseData.key).then(
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
        function drinkRemovedFromMenuInFirebaseACB(firebaseData) {
            model.removeFromMenu({ id: +firebaseData.key });
        }
    );
}

function firebaseModelPromise() {
    function getAllDrinksFromFirebasePromiseACB(firebaseData) {
        function createModelACB(drinksArray) {
            return new DrinksModel(+firebaseData.val().numberOfGuests, drinksArray)
        }
        function makeDrinkPromiseCB(drinkId) {
            return getDrinkDetails(drinkId);
        }
        if (firebaseData.val() == undefined || firebaseData.val().drinkFavorites == undefined) {
            return new DrinksModel();
        }
        const allDrinksPromiseArray = Object.keys(firebaseData.val().drinkFavorites).map(makeDrinkPromiseCB);
        return Promise.all(allDrinksPromiseArray).then(createModelACB);
    }
    return firebase.database().ref(REF).once("value").then(getAllDrinksFromFirebasePromiseACB);
}

export { updateFirebaseFromModel, updateModelFromFirebase, firebaseModelPromise };