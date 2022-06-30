const Summary=require("../vuejs/summaryPresenter.js").default;
const Home=require("../vuejs/homePresenter.js").default;
const Details=require("../vuejs/detailsPresenter.js").default;
const Show=require("../vuejs/show.js").default;

export default
function App(props){
    return (<div class="container">
                <div class="main-view">
                    <Show hash="#home"><Home model={props.model}/></Show>
                    <Show hash="#details"><Details model={props.model}/></Show>
                    <Show hash="#summary"><Summary model={props.model}/></Show>
                </div>
            </div>
           );
}
