import { getDrinkDetails, searchDrinks } from "./drinkSource";
import resolvePromise from "./resolvePromise";

class DrinksModel {
    constructor(nrGuests = 2, drinkArray = [], currentDrink, searchResultsPromiseState = {}, searchParams = {}) {
        this.observers = [];
        this.setNumberOfGuests(nrGuests);
        this.drinkFavorites = drinkArray;
        this.searchResultsPromiseState = {};
        this.searchParams = {};
        this.currentDrinkPromiseState = {};
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
        resolvePromise(
            searchDrinks(searchParams),
            this.searchResultsPromiseState,
            this.notifyObservers.bind(this));
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
        function compareDrinks(drink) {
            if (drink.idDrink == drinkToAdd.idDrink) {
                return true;
            }
            return false;
        }
        if (this.drinkFavorites.find(compareDrinks) == undefined) {
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

    setCurrentDrink(id) {
        const theModel = this;
        function notifyACB(){
            theModel.notifyObservers();
        }
        if (id !== null && id !== this.currentDrink) {
            resolvePromise(getDrinkDetails(id), this.currentDrinkPromiseState, notifyACB)
            this.currentDrink = id;
            this.notifyObservers({setCurrentDrinkId: id});
        }
    }
}

export default DrinksModel;
