import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Favorites = () => {
    const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || [])

    console.log('props here', favorites)
    
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    },[favorites])

    const remove = (id) => {
        let newFavorites = favorites.filter(ticker => ticker.id !== id)
        setFavorites([...newFavorites])
    }

    return (
        <div>
            <h2> This is the favorites page</h2>

            {favorites.map((ticker, i) =>
                    <div className='display-search-container' key={i}>
                            <p className="ticker-name">{ticker.id}</p>
                        <Link to={`/about/${ticker.symbol}`}>
                            <button className='details-btn'>Details</button>
                        </Link>
                        <i className="fa-solid fa-star" onClick={() => remove(ticker.id)}></i>
                    </div>
                )}
        </div>

    );
}

export default Favorites;