import { firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase } from "../firebaseModel";
import resolvePromise from "../resolvePromise";
import promiseNoData from "../views/promiseNoData";
import DinnerModel from "/src/DinnerModel.js";
import App from "/src/views/app.js";

let proxyModel;
const VueRoot={

    data(){ return {
        modelPromiseState: {}, 
        };
    },
    created(){
        function notifyACB(){
            if (component.modelPromiseState.data) {
                updateFirebaseFromModel(component.modelPromiseState.data);
                updateModelFromFirebase(component.modelPromiseState.data);
            }
        }
        const component = this;
        lifecycle: resolvePromise(firebaseModelPromise(), component.modelPromiseState, notifyACB);
        //updateModelFromFirebase(component.rootModel)
    },
    render(){
        const component = this;
        return promiseNoData(component.modelPromiseState) || <App model={component.modelPromiseState.data}/>;
    },
};

export default VueRoot;

export {proxyModel};