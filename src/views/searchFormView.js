function SearchFormView(props) {
    function dishTypeOptionsCB(dishOption) {
        return <option value={dishOption}>{dishOption}</option>
    }

    function onInputChangeACB(event) {
        props.onInputChange(event.target.value);
    }

    function onSelectChangeACB(event) {
        props.onSelectChange(event.target.value);
    }

    function onClickSearchButtonACB(event) {
        props.onClickSearchButton();
    }

    function onClickSummaryButtonACB(event) {
        window.location.hash = "#summary";
    }

    return (
        <div class="searchForm">
            <input type="text" placeholder="Search..." class="searchTextField" onChange={onInputChangeACB}></input>
            <select class="searchButtons" name="dishTypesOptions" onChange={onSelectChangeACB}>
                <option value="">Choose:</option>
                {props.dishTypeOptions.map(dishTypeOptionsCB)}
            </select>
            <button class="searchButtons" onClick={onClickSearchButtonACB}>Search!</button>
            <button class="searchButtons" onClick={onClickSummaryButtonACB}>Summary</button>
        </div>
    )
}

export default SearchFormView;