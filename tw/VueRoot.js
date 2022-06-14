import DrinksModel from "/src/DrinksModel.js";
import App from "/src/views/app.js";

let proxyModel;
const VueRoot={
    data(){
        return {rootModel: new DrinksModel()} ;
    } ,
    render(){
        return <App model={this.rootModel} />;
    },

    // We export the VueRoot model to other packages for lab purposes
    created(){
        proxyModel=this.rootModel;
    },
};

export default VueRoot;

export {proxyModel};
