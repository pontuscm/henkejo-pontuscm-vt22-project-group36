function promiseNoData(promiseState) {
    if (!promiseState.promise) {
        return <div>no data</div>
    }
    if (!promiseState.data && !promiseState.error) {
        return <img src="https://i.gifer.com/ZZ5H.gif" height="30"></img>
    }
    if (promiseState.error) {
        return <div>{promiseState.error}</div>
    }
    if (promiseState.promise) {
        return false
    }
    return <div>
        {promiseNoData(props.model.searchPromiseState) ||
            <span searchResults={promiseState.data}/>}
    </div>
}

export default promiseNoData;