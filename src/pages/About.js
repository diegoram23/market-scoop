import axios from "axios";
import { useEffect, useState } from "react";

const About = ({ tickerName }) => {

    const [tickerNews, setTickerNews] = useState([])
    const [tickerStats, setTickerStats] = useState([])

    useEffect(() => {
        axios
            .get(`https://finnhub.io/api/v1/company-news?symbol=${tickerName}&from=2023-01-01&to=2023-03-03&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg`)
            .then(res => {
                setTickerNews(res.data)
            })
    }, [])

    const newsArticles = tickerNews.slice(0, 5)

    useEffect(() => {
        axios
            .get(`https://finnhub.io/api/v1/quote?symbol=${tickerName}&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg`)
            .then(res => {
                setTickerStats(res.data)
            })
    },[])
    
    console.log('stats', tickerStats);

    return (
        <div>
            {/*Quotes and prices related to ticker name that was searched*/}
           
            {/*News related to ticker name that was searched*/}
            {newsArticles.map(article =>
                <div className='news-container' key={article.id}>
                    <a href={article.url}><h4 className="news-headline">{article.headline}</h4></a>
                    <img className='news-image' src={article.image} />
                    <p className="news-time"> {new Date(article.datetime * 1000).toLocaleString("en-us")}</p>
                    <p className="news-summary">{article.summary}</p>
                </div>)}
            <p>{tickerName}</p>
        </div>
    );
}

export default About;