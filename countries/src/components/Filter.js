const Filter = ({filter, onFilterChange}) => {
    return(
    <div>
        find countries: <input value = {filter} onChange = {onFilterChange} />
    </div>
    )

}

export default Filter