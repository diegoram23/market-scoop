import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const News = () => {

    const [marketNews, setMarketNews] = useState([])

    useEffect(() => {
        axios
            .get(`https://finnhub.io/api/v1/news?category=general?&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg`)
            .then(res => {
                const sevenArticles = res.data.slice(0, 7)
                setMarketNews(sevenArticles)
            })
    }, [])

    const techNews = marketNews.filter(news => news.category === 'top news')

    return (
        <div>
            {techNews.map(news =>
                <div className='news-container' key={news.id}>
                    <a href={news.url}><h4 className="news-headline">{news.headline}</h4></a>
                    <img className='news-image' src={news.image} />
                    <p className="news-time"> {new Date(news.datetime * 1000).toLocaleString("en-us")}</p>
                    <p className="news-summary">{news.summary}</p>
                </div>)}
            <Outlet />
        </div>
    );
}

export default News;