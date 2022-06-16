import render from "./teacherRender.js";

// make webpack load the file only if it exists
const X= TEST_PREFIX;

render(<div>call myModel methods at the Console to see the payload!</div>,
       document.getElementById("root"));

const DrinksModel=require("/src/"+X+"DrinksModel.js").default;

const model= new DrinksModel();

function myObserverACB(payload){
    console.log(payload);

    render(<div>{JSON.stringify(payload)}</div>,
           document.getElementById("root"));
}
    
model.addObserver(myObserverACB);

window.myModel=model;
