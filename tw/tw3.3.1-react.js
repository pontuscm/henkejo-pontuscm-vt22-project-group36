import render from "./teacherRender.js";

// make webpack load the file only if it exists
const X= TEST_PREFIX;

const DrinksModel=require("/src/"+TEST_PREFIX+"DrinksModel.js").default;

const App=require("/src/views/"+TEST_PREFIX+"app.js").default;


let navigation;
try{
    require("/src/views/"+X+"navigation.js").default;
    navigation=true;
}catch(e){
    render(<div>
             Please write /src/views/navigation.js
           </div>,  document.getElementById('root'));
}
if(navigation){
    const model= new DrinksModel();
    model.addObserver(console.log);
    window.myModel=model;
    render(
        <App model={model}/>,
        document.getElementById('root')
    );       
}
