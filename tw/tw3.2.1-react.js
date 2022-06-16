import render from "./teacherRender.js";

// make webpack load the file only if it exists
const X= TEST_PREFIX;

const DrinksModel=require("/src/"+TEST_PREFIX+"DrinksModel.js").default;

let Search;
try{
    Search=require("/src/reactjs/"+X+"searchPresenter.js").default;
}catch(e){
    render(<div>
             Please write /src/reactjs/searchPresenter.js
           </div>,  document.getElementById('root'));
}
if(Search){
    const model= new DrinksModel();

    function myObserverACB(){
        console.log(model);
    }
    model.addObserver(myObserverACB);
    
    window.myModel=model;
    render(
        <Search model={model}/>,
        document.getElementById('root')
    );       
}
