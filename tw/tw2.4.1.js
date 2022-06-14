import render from "./teacherRender.js";


// make webpack load the file only if it exists
const X= TEST_PREFIX;

const DrinksModel=require("/src/"+X+"DrinksModel.js").default;
const searchDishes=require("/src/"+X+"dishSource.js").searchDishes;
try{
    if(!DrinksModel.prototype.doSearch) throw "not defined";
}catch(e){
    render(<div>
             Please write DrinksModel.doSearch()
           </div>,  document.getElementById('root'));
}

if(DrinksModel.prototype.doSearch){
    const VueRoot={
        data(){
            return {rootModel: new DrinksModel()} ;
        } ,
        render(){
            if(!this.rootModel.searchResultsPromiseState.promise){
                this.rootModel.doSearch({});
            }
                

            return <div>
                   search results promise state: {JSON.stringify(this.rootModel.searchResultsPromiseState)}
               </div>;
        },
    };
    
    render(
        <VueRoot/>
        ,    document.getElementById('root')
    );
}

