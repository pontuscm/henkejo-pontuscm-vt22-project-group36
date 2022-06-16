import render from "./teacherRender.js";


// make webpack load the file only if it exists
const X= TEST_PREFIX;

const DrinksModel=require("/src/"+X+"DrinksModel.js").default;
let promiseNoData;
try{
    promiseNoData=require("/src/views/"+X+"promiseNoData.js").default;
    if(!promiseNoData || !DrinksModel.prototype.doSearch) throw "not defined";
}catch(e){
    render(<div>
             Please write /src/views/promiseNoData.js
             <br/>Please write DrinksModel.doSearch()
           </div>,  document.getElementById('root'));
}
if(promiseNoData && DrinksModel.prototype.doSearch){
    const VueRoot={
        data(){
            return {rootModel: new DrinksModel()} ;
        } ,
        render(){
            if(!this.rootModel.searchResultsPromiseState.promise)
                this.rootModel.doSearch({});

            return promiseNoData(this.rootModel.searchResultsPromiseState)||
                <ol>{
                        this.rootModel.searchResultsPromiseState.data.map(function eachResultCB(dishResult){
                        return <li key={dishResult.id}>{JSON.stringify(dishResult)}</li>;
                    })
                }</ol>;
        },
    };
    
    render(
        <VueRoot/>
        ,    document.getElementById('root')
    );
}

