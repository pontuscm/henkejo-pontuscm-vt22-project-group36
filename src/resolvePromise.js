function resolvePromise(promise, promiseState, notifyACB) {
    if(promise === null) return TypeError("promise is null");
    promiseState.promise = promise;
    promiseState.data = null;         
    promiseState.error = null;
    if(notifyACB) notifyACB();    // notify every time promise, data, or error change
    function saveDataACB(result){ 
        if(promiseState.promise !== promise) return;
        promiseState.data = result;
        if(notifyACB) notifyACB();    
    } 
    function saveErrorACB(err) {
        if(promiseState.promise !== promise) return;
        promiseState.error = err;
        if(notifyACB) notifyACB();
    }
    promiseState.promise.then(saveDataACB).catch(saveErrorACB);
}

export default resolvePromise;