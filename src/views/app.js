
/* 
   This component uses Vue-specific and React-specific presenters: Sidebar, Summary, Search, Details, Show 
   Therefore it needs to import from alternative paths, depending on the framework. 
   To achieve that, we use require() with a prefix, instead of import.
*/
const PREFIX=window.location.toString().includes("react")?"reactjs":"vuejs";

const Summary=require("../vuejs/summaryPresenter.js").default;
const Sidebar=require("../vuejs/sidebarPresenter.js").default;
const Search=require("../vuejs/searchPresenter.js").default;
const Details=require("../vuejs/detailsPresenter.js").default;
const Show=require("../vuejs/show.js").default;


export default
function App(props){
    return (<div class="flexParent">
                {/* TODO TW1.2 Sidebar will be added here, inside a DIV, like Summary below */}
                <div class="sidebar"><Sidebar model={props.model}/></div>
                <Show hash="#search"><Search model={props.model}/></Show>
                <Show hash="#details"><Details model={props.model}/></Show>
                <Show hash="#summary"><Summary model={props.model}/></Show>
            </div>
           );
}
