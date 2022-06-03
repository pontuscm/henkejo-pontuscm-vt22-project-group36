
const Show={
    props:["hash"],
    data(){ 
        return {hashState: window.location.hash};
    },
    created(){
        const component = this;
        function hashListenerACB(event){
            component.hashState = window.location.hash;
        }
        window.addEventListener("hashchange", hashListenerACB);
        this.listener = hashListenerACB;
    },
    unmounted(){
        window.removeEventListener("hashchange", this.listener);
    },
    render(){
        const component = this;
        return <div class={component.hash == component.hashState ? "" : "hidden"}>{this.$slots.default()}</div>
    },
};

export default Show;