const Summary=require("../vuejs/summaryPresenter.js").default;
const Sidebar=require("../vuejs/sidebarPresenter.js").default;
const Search=require("../vuejs/searchPresenter.js").default;
const Details=require("../vuejs/detailsPresenter.js").default;
const Show=require("../vuejs/show.js").default;

export default
function App(props){
    return (<div class="flexParent">
                <div class="sidebar"><Sidebar model={props.model}/></div>
                <Show hash="#search"><Search model={props.model}/></Show>
                <Show hash="#details"><Details model={props.model}/></Show>
                <Show hash="#summary"><Summary model={props.model}/></Show>
            </div>
           );
}
