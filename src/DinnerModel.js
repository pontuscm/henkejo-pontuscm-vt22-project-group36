import { getDishDetails, searchDishes } from "./dishSource";
import resolvePromise from "./resolvePromise";

class DinnerModel {
    constructor(nrGuests = 2, drinkArray = [], currentDish, searchResultsPromiseState = {}, searchParams = {}) {
        this.observers = [];
        this.setNumberOfGuests(nrGuests);
        this.drinkFavorites = drinkArray;
        this.searchResultsPromiseState = {};
        this.searchParams = {};
        this.currentDishPromiseState = {};
    }

    removeObserver(observerACB) {
        function checkEqualObserverCB(observerInArray) {
            if (observerInArray == observerACB) {
                return false;
            }
            return true;
        }
        this.observers = this.observers.filter(checkEqualObserverCB);
    }

    addObserver(observerACB) {
        this.observers = [...this.observers, observerACB];
        return this.removeObserver();
    }

    notifyObservers(payload) {
        this.observers.forEach(
            function invokeObserverACB(observer) {
                try {
                    observer(payload);
                } catch (error) {
                    console.error(error);
                }
            }
        );
    }

    setSearchQuery(q) {
        this.searchParams.query = q;
    }

    setSearchType(t) {
        this.searchParams.type = t;
    }

    doSearch(searchParams) {
        resolvePromise(searchDishes(searchParams), this.searchResultsPromiseState, this.notifyObservers.bind(this));
    }

    setNumberOfGuests(nr) {
        const thisComponent = this;
        if (nr < 1 || !Number.isInteger(nr)) {
            throw new Error("number of guests not a positive integer: " + String(nr));
        }
        else if (this.numberOfGuests != nr) {
            this.numberOfGuests = nr;
            thisComponent.notifyObservers({setNumOfGuests: nr});
        }
    }

    addToMenu(drinkToAdd) {
        const thisComponent = this;
        function compareDishes(drink) {
            if (drink.idDrink == drinkToAdd.idDrink) {
                return true;
            }
            return false;
        }
        if (this.drinkFavorites.find(compareDishes) == undefined) {
            this.drinkFavorites = [...this.drinkFavorites, drinkToAdd];
            thisComponent.notifyObservers({addDrink: drinkToAdd});
        }
    }

    removeFromMenu(drinkToRemove) {
        const thisComponent = this;
        function hasSameIdCB(drink) {
            if (drink.idDrink != drinkToRemove.idDrink) {
                return true;
            }
            else {
                thisComponent.notifyObservers({removeDrink: drinkToRemove});
                return false;
            }
        }
        this.drinkFavorites = this.drinkFavorites.filter(hasSameIdCB);
    }

    setCurrentDish(id) {
        const theModel = this;
        function notifyACB(){
            theModel.notifyObservers();
        }
        if (id !== null && id !== this.currentDish) {
            resolvePromise(getDishDetails(id), this.currentDishPromiseState, notifyACB)
            this.currentDish = id;
            this.notifyObservers({setCurrentDishId: id});
        }
    }
}

export default DinnerModel;
