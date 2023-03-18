import { HashRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
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
        console.log(e.target.value);
        setSearchValue(e.target.value)
    }

    useEffect(() => {
        axios
            .get(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg`)
            .then(res => {
                setTickers(res.data)
            })
    }, [])


    const displaySearch =
        searchValue.length <= 0
            ? []
            : tickers.filter(tick =>
                tick.displaySymbol.toLowerCase().startsWith(searchValue.toLowerCase())).slice(0, 5)

    return (
        <div>
            <HashRouter>
                <header>
                    <h2>El Guru News</h2>
                    <nav>
                        <NavLink to='/'>Home</NavLink>
                        <NavLink to='/about'>About</NavLink>
                    </nav>
                    <form onSubmit={handleSubmit}>
                        <input
                            placeholder="Search..."
                            required
                            onChange={handleSearch}
                            value={searchValue}
                        />
                        <button className="search-btn">Search</button>
                    </form>

                    {displaySearch.map(ticker =>

                        <div className='display-search-container' key={ticker.figi}>
                            <p className="ticker-name">{ticker.displaySymbol}</p>
                            <Link to='/about'>
                                <button className='details-btn' onClick={() => (setTickerName(ticker.symbol))}>Details</button>
                            </Link>
                        </div>
                    )}
                    {tickerName && <About tickerName={tickerName} />}

                </header>

                
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                </Routes>
            </HashRouter>

        </div>
    );
}



