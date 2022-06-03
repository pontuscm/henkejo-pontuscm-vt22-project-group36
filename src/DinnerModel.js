import { getDishDetails, searchDishes } from "./dishSource";
import resolvePromise from "./resolvePromise";

/* This is an example of a JavaScript class.
   The Model keeps only abstract data and has no notions of graohics or interaction
*/
class DinnerModel {
    constructor(nrGuests = 2, dishArray = [], currentDish, searchResultsPromiseState = {}, searchParams = {}) {
        this.observers = [];
        this.setNumberOfGuests(nrGuests);
        this.dishes = dishArray;
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
        // if() and throw exercise

        // TODO throw an error if the argument is smaller than 1 or not an integer
        // the error message must be exactly "number of guests not a positive integer"
        // to check for integer: test at the console Number.isInteger(3.14)

        if (nr < 1 || !Number.isInteger(nr)) {
            throw new Error("number of guests not a positive integer: " + String(nr));
        }

        // TODO if the argument is a valid number of guests, store it in this.numberOfGuests
        // when this is done the TW1.1 DinnerModel "can set the number of guests" should pass
        // also "number of guests is a positive integer"
        else if (this.numberOfGuests != nr) {
            this.numberOfGuests = nr;
            thisComponent.notifyObservers({setNumOfGuests: nr});
        }
    }

    addToMenu(dishToAdd) {
        const thisComponent = this;
        // array spread syntax example. Make sure you understand the code below.
        // It sets this.dishes to a new array [   ] where we spread (...) the previous value
        function compareDishes(dish) {
            if (dish.id == dishToAdd.id) {
                return true;
            }
            return false;
        }
        if (this.dishes.find(compareDishes) == undefined) {
            this.dishes = [...this.dishes, dishToAdd];
            thisComponent.notifyObservers({addDish: dishToAdd});
        }
    }

    removeFromMenu(dishToRemove) {
        // callback exercise! Also return keyword exercise
        const thisComponent = this;
        function hasSameIdCB(dish) {
            // TODO return true if the id property of dish is _different_ from the dishToRemove's id property
            // This will keep the dish when we filter below.
            // That is, we will not keep the dish that has the same id as dishToRemove (if any)
            if (dish.id != dishToRemove.id) {
                return true;
            }
            else {
                thisComponent.notifyObservers({removeDish: dishToRemove});
                return false;
            }
        }
        this.dishes = this.dishes.filter(hasSameIdCB);
        // the test "can remove dishes" should pass
    }

    /* 
       ID of dish currently checked by the user.
       A strict MVC/MVP Model would not keep such data, 
       but we take a more relaxed, "Application state" approach. 
       So we store also abstract data that will influence the application status.
     */
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
