
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
        if (component.hash == component.hashState) {
            return <div class="">{this.$slots.default()}</div>
        } else {
            return <div></div>
        }
    },
};

export default Show;