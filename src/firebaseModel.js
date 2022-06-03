import firebaseConfig from "/src/firebaseConfig.js";
import { getDishDetails, searchDishes } from "./dishSource";
import resolvePromise from "./resolvePromise";
import DinnerModel from "./DinnerModel";

firebase.initializeApp(firebaseConfig);
const REF = "dinnerModel10";

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
            if (payload.setCurrentDishId) {
                firebase.database().ref(REF + "/currentDishId/").set(payload.setCurrentDishId);
            }
            if (payload.addDish) {
                firebase.database().ref(REF + "/dishes/" + String(payload.addDish.id)).set(payload.addDish.title);
            }
            if (payload.removeDish) {
                firebase.database().ref(REF + "/dishes/" + String(payload.removeDish.id)).set(null);
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
    firebase.database().ref(REF + "/currentDishId").on("value",
        function currentDishIdChangedInFirebaseACB(firebaseData) {
            model.setCurrentDish(+firebaseData.val());
        }
    );

    firebase.database().ref(REF + "/dishes").on("child_added",
        function dishAddedFromMenuInFirebaseACB(firebaseData) {
            function compareDishes(dish) {
                if (dish.id == +firebaseData.key) {
                    return true;
                }
                return false;
            }
            function fetchDishDataBasedOnID(key) {
                return getDishDetails(key);
            }
            if (model.dishes.find(compareDishes) == undefined) {
                fetchDishDataBasedOnID(+firebaseData.key).then(
                    function addDishToModelACB(dish) {
                        model.addToMenu(dish);
                    }
                ).catch(
                    function processErrorACB(err) {
                        console.log(err);
                    }
                )
            }
        }
    );
    firebase.database().ref(REF + "/dishes").on("child_removed",
        function dishRemovedFromMenuInFirebaseACB(firebaseData) {
            model.removeFromMenu({ id: +firebaseData.key });
        }
    );
}

function firebaseModelPromise() {
    function getAllDishesFromFirebasePromiseACB(firebaseData) {
        function createModelACB(dishesArray) {
            return new DinnerModel(+firebaseData.val().numberOfGuests, dishesArray)
        }
        function makeDishPromiseCB(dishId) {
            return getDishDetails(dishId);
        }
        if (firebaseData.val() == undefined || firebaseData.val().dishes == undefined) {
            return new DinnerModel();
        }
        const allDishesPromiseArray = Object.keys(firebaseData.val().dishes).map(makeDishPromiseCB);
        return Promise.all(allDishesPromiseArray).then(createModelACB);
    }
    return firebase.database().ref(REF).once("value").then(getAllDishesFromFirebasePromiseACB);
}

export { updateFirebaseFromModel, updateModelFromFirebase, firebaseModelPromise };