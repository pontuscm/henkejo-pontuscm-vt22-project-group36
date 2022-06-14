// this is a stub for TW3.5 bootstraping. It helps with a few lab specifics
import { render, h } from "vue";

// needed for View JSX. In a Vue project you can use import {h} from "vue"
window.React = { createElement: h };

import firebase from "firebase/app";
import "firebase/database";

// needed for plugging in a "mock" firebase for testing. In the project simply import firebase where needed, as above
window.firebase = firebase;

// TODO import navigation

// using require() instead of import, for the above assignments to take effect before VueRoot is loaded
const VueRoot = require("/src/vuejs/VueRoot.js").default;

const DrinksModel = require("/src/DrinksModel.js").default;
const App = require("/src/views/app.js").default;

let firebaseModel;

try {
    firebaseModel = require("/src/firebaseModel.js");
    if (!firebaseModel.updateFirebaseFromModel)
        throw "not found";
    require("/src/views/navigation.js");
} catch (e) {
    render(<div>
        Please write /src/firebaseModel.js and updateFirebaseFromModel
    </div>, document.getElementById('root'));
}
if (firebaseModel && firebaseModel.updateFirebaseFromModel) {
    const { updateFirebaseFromModel, updateModelFromFirebase } = firebaseModel;
    const VueRoot = {
        data() { return { rootModel: new DrinksModel() }; },
        render() { return <App model={this.rootModel} />; },
        created() {
            updateFirebaseFromModel(this.rootModel);
            if (updateModelFromFirebase) // maybe it was not defined yet
                updateModelFromFirebase(this.rootModel);
            window.myModel = this.rootModel;
        }
    };
    render(
        <VueRoot />
        , document.getElementById('root')
    );
}