import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Favorites = () => {
    const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || [])
    const [tickerName, setTickerName] = useState('')

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const remove = (id) => {
        let newFavorites = favorites.filter(ticker => ticker.id !== id)
        
        setFavorites([...newFavorites])
    }

    return (
        <div>

            <h2 className="sub-heading">Favorites</h2>

            {favorites.length === 0 ? (
                <p className="favorites-empty">Use search bar to add tickers to your favorites.</p>
            ) : favorites.map((ticker, i) =>
                <div className='display-search-container' key={i}>
                    <p className="ticker-name">{ticker.id}</p>
                    <Link to={`/about/${ticker.id}`}>
                        <button className='details-btn' onClick={() => setTickerName(ticker.id)}>Details</button>
                    </Link>
                    <i className="fa-solid fa-star" onClick={() => remove(ticker.id)}></i>
                </div>
            )}
        </div>

    );
}

export default Favorites;