import { HashRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Watchlist from './pages/Favorites';
import { useState, useEffect } from 'react'
import axios from 'axios';


export default function App() {

    const [searchValue, setSearchValue] = useState('')
    const [tickers, setTickers] = useState([])
    const [tickerName, setTickerName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleSearch = (e) => {
        setSearchValue(e.target.value)
    }

    useEffect(() => {
        axios
            .get(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg`)
            .then(res => {
                setTickers(res.data.filter(ticker =>
                    ticker.displaySymbol.length <= 4 && ticker.type === 'Common Stock' || ticker.type === 'ADR'))
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
                            <input
                                placeholder="Search..."
                                required
                                onChange={handleSearch}
                                value={searchValue}
                            />
                            <button className="search-btn">Search</button>
                        </form>
                        <NavLink to='/watchlist'>Favorites</NavLink>
                    </nav>

                </header>

                {displaySearch.map(ticker =>
                    <div className='display-search-container' key={ticker.figi}>
                        <p className="ticker-name">{ticker.displaySymbol}</p>
                        <Link to={`/about/${ticker.symbol}`}>
                            <button className='details-btn' onClick={() => (setTickerName(ticker.symbol), setSearchValue(''))}>Details</button>
                            <i className="fa-regular fa-star"></i>
                        </Link>
                    </div>
                )}

                <Routes>
                    <Route path='/' element={<Home />} />
                    {tickerName && <Route path='/about/:id' element={<About tickerName={tickerName} />} />}
                    <Route path='/watchlist' element={<Watchlist />}></Route>
                </Routes>
            </HashRouter>

        </div>
    );
}



