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
        <form class="search-form">
            <input type="text" placeholder="Search..." class="search-box" onChange={onInputChangeACB}></input>
            <input type="submit" class="search-submit-btn">
                <i class="fa fa-search"></i>
            </input>
        </form>
    )
}

export default SearchFormView;