import { useState, useEffect } from "react"
import axios from "axios"

const SearchForm = () => {

    const [searchValue, setSearchValue] = useState('')
    const [tickers, setTickers] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleSearch = (e) => {
        console.log(e.target.value);
        setSearchValue(e.target.value)
    }

    // useEffect(() => {
    //     axios
    //         .get(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg`)
    //         .then(res => {
    //             setTickers(res.data)
    //             console.log(res.data);
    //         })
    // }, [])

    const displayTickers =
        searchValue.length <= 1
            ? []
            : tickers.filter(tick =>
                tick.displaySymbol.toLowerCase().startsWith(searchValue.toLowerCase()))

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Search..."
                    required
                    onChange={handleSearch}
                    value={searchValue}
                />
                <button>Search</button>
            </form>
            {displayTickers.map(ticker =>
                <div key={ticker.id}>
                    <p>{ticker.displaySymbol}</p>
                </div>
            )}
        </div>
    );
}

export default SearchForm;