import { useState, useEffect } from "react"
import axios from "axios"

const About = ({ tickerName }) => {
    const [tickerNews, setTickerNews] = useState([])

    useEffect(() => {
        axios
            .get(`https://finnhub.io/api/v1/company-news?symbol=${tickerName}&from=2023-01-01&to=2023-03-03&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg`)
            .then(res => {
                setTickerNews(res.data)
            })
    }, [tickerName])

    const newsArticles = tickerNews.slice(0, 5)

    return (
        <div>

            {newsArticles.map(article =>
                <div className='news-container' key={article.id}>
                    <a href={article.url}> <h4 className="news-headline">{article.headline}</h4> </a>
                    <a href={article.url}> <img className='news-image' alt='user uploaded content' src={article.image} /> </a>
                    <p className="news-time"> {new Date(article.datetime * 1000).toLocaleString("en-us", { hour: '2-digit', minute: '2-digit' })}</p>
                    <p className="news-summary">{article.summary}</p>
                </div>)}
        </div>
    );
}

export default About;