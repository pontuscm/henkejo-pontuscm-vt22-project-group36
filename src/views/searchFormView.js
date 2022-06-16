function SearchFormView(props) {
    function drinkTypeOptionsCB(drinkOption) {
        return <option value={drinkOption}>{drinkOption}</option>
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
            <select class="searchButtons" name="drinkTypesOptions" onChange={onSelectChangeACB}>
                <option value="">Choose:</option>
                {props.drinkTypeOptions.map(drinkTypeOptionsCB)}
            </select>
            <button class="searchButtons" onClick={onClickSearchButtonACB}>Search!</button>
            <button class="searchButtons" onClick={onClickSummaryButtonACB}>Summary</button>
        </div>
    )
}

export default SearchFormView;