import { HashRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Watchlist from './pages/Favorites';
import { useState, useEffect } from 'react'

export default function App() {

    const [searchValue, setSearchValue] = useState('')
    const [tickers, setTickers] = useState([])
    const [tickerName, setTickerName] = useState('')
    const [isPending, setIsPending] = useState(true)
    const [isError, setIsError] = useState(null)

    const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || [])

    useEffect(() => {
        if (favorites) {
            localStorage.setItem('favorites', JSON.stringify(favorites))
        }
    }, [favorites])


    const add = (id) => {
        setFavorites(prevId =>
            [...prevId, { id, saved: true }]
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleSearch = (e) => {
        setSearchValue(e.target.value)
    }

    useEffect(() => {
        fetch(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg`)
            .then(res => {
                if (!res.ok) {
                    throw Error('Unable to connnect to server')
                }
                return res.json()
            })
            .then(data => {
                setTickers(data.filter(ticker =>
                    ticker.displaySymbol.length <= 4 && (ticker.type === 'Common Stock' || ticker.type === 'ADR')))
                setIsError(null)
                setIsPending(false)
            })
            .catch(err => {
                setIsError(err.message);
            })
    }, [])

    const displaySearch =
        searchValue.length <= 0
            ? []
            : tickers.filter(tick =>
                tick.displaySymbol.toLowerCase().startsWith(searchValue.toLowerCase())).slice(0, 5)

    const clearState = () => {
        setTickerName('')
        setSearchValue('')
    }

    return (
        <div>
            <HashRouter>
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
                                <button className="search-btn" onClick={() => setTickerName(searchValue.toUpperCase(), setSearchValue(''))}>Search</button>
                            </Link>
                        </form>
                        <NavLink to='/watchlist'>Favorites</NavLink>
                    </nav>

                </header>

                {displaySearch.map(ticker =>
                    <div className='display-search-container' key={ticker.figi}>
                        {isPending ? (
                            <p>loading</p>
                        ) :
                            <p className="ticker-name">{ticker.displaySymbol}</p>}
                        <Link to={`/about/${ticker.symbol}`}>
                            <button className='details-btn' onClick={() => (setTickerName(ticker.symbol), setSearchValue(''))}>Details</button>
                        </Link>
                        <i className="fa-regular fa-star" onClick={() => add(ticker.symbol)}></i>
                    </div>
                )}

                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about/:id' element={<About tickerName={tickerName} />} />
                    <Route path='/watchlist' element={<Watchlist favorites={favorites} />}></Route>
                </Routes>
            </HashRouter>

        </div>
    );
}



