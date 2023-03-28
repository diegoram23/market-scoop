import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Header = () => {

    //Search values state
    const [searchValue, setSearchValue] = useState('')
    const [tickers, setTickers] = useState([])
    const [tickerName, setTickerName] = useState('')

    //Errors and loading messages state
    const [isPending, setIsPending] = useState(true)
    const [isError, setIsError] = useState(null)
    //favorites state
    const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || [])

    //Renders when state of favorites array changes
    useEffect(() => {
        if (favorites) {
            localStorage.setItem('favorites', JSON.stringify(favorites))
        }
    }, [favorites])

    //Adds ticker to favorites array
    const add = (id) => {
        setFavorites(prevId =>
            [...prevId, { id, saved: !prevId.saved }])
    }

    //Changes favorites icon from regular <- -> solid on click
    let favIcon = favorites.saved ? 'fa-solid' : 'fa-regular'

    //Handles search button submit
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    //Handles search values on search bar
    const handleSearch = (e) => {
        setSearchValue(e.target.value)
    }

    //Fetches tickers based on search value input
    useEffect(() => {
        fetch(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg`)

            //Throws error on fetch if unsuccesful
            .then(res => {
                if (!res.ok) {
                    throw Error('Unable to connnect to server')
                }
                return res.json()
            })
            //Sets state if fetch succesful
            .then(data => {
                setTickers(data.filter(ticker =>

                    //Filters for symbols of certain criteria
                    ticker.displaySymbol.length <= 4 && (ticker.type === 'Common Stock' || ticker.type === 'ADR')))
                setIsError(null)
                setIsPending(false)
            })
            //Catches and sets error if state if there is one
            .catch(err => {
                setIsError(err.message);
            })
    }, [])

    //Filters ticker results to length of 5
    const displaySearch =
        searchValue.length <= 0
            ? []
            : tickers.filter(tick =>
                tick.displaySymbol.toLowerCase().startsWith(searchValue.toLowerCase())).slice(0, 5)

    //Clears search bar state and value
    const clearState = () => {
        setTickerName('')
        setSearchValue('')
    }
    return (
        <div>
            <header>
                <Link to='/' onClick={clearState} className='logo'>Market<span>Scoop</span></Link>
                <nav>

                    <form onSubmit={handleSubmit}>
                        {isError && <p>{isError}</p>}
                        <input
                            placeholder="Search..."
                            required
                            onChange={handleSearch}
                            value={searchValue}
                        />
                        <Link to={`/about/${searchValue}`}>
                            <button
                                className="search-btn"
                                disabled={searchValue === ''}
                                onClick={() => setTickerName(searchValue.toUpperCase(), setSearchValue(''))}>Search
                            </button>
                        </Link>
                    </form>
                    <NavLink to='/watchlist' onClick={() => setSearchValue('')}>Favorites</NavLink>
                </nav>
            </header>

            {displaySearch.map(ticker =>
                <div className='display-search-container' key={ticker.figi}>
                    {isPending ? (
                        <p>loading</p>
                    ) :
                        <p className="ticker-name">{ticker.displaySymbol}</p>}
                    <Link to={`/about/${ticker.symbol}`}>
                        <button
                            className='details-btn'
                            onClick={() => (setTickerName(ticker.symbol), setSearchValue(''))}>Details
                        </button>
                    </Link>
                    <i
                        className={`${favIcon} fa-star`}
                        onClick={() => add(ticker.symbol)}>
                    </i>
                </div>
            )}
            <Outlet />
        </div>
    );
}

export default Header;