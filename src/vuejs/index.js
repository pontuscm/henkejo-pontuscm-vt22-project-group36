import { render, h } from "vue";
window.React = { createElement: h };
import firebase from "firebase/app";
import "firebase/database";
window.firebase = firebase;

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
            if (updateModelFromFirebase)
                updateModelFromFirebase(this.rootModel);
            window.myModel = this.rootModel;
        }
    };
    render(
        <VueRoot />
        , document.getElementById('root')
    );
}