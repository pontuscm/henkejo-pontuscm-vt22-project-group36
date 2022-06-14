import render from "./teacherRender.js";

// make webpack load the file only if it exists
const X= TEST_PREFIX;

const DrinksModel=require("/src/"+TEST_PREFIX+"DrinksModel.js").default;

const App=require("/src/views/"+TEST_PREFIX+"app.js").default;

    const model= new DrinksModel();
    model.addObserver(console.log);
    window.myModel=model;
    render(
        <App model={model}/>,
        document.getElementById('root')
    );       

