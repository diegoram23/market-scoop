import axios from "axios";
import { useEffect, useState } from "react";

const About = ({ tickerName }) => {

    const [newsInfo, setNewsInfo] = useState([])
    console.log('props is', tickerName);

    useEffect(() => {
        axios
            .get(`https://finnhub.io/api/v1/company-news?symbol=${tickerName}&from=2023-01-01&to=2023-03-03&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg`)
            .then(res => {
                setNewsInfo(res.data)
                console.log('fetch data', res.data)
            })
    }, [])

    const newsArticles = newsInfo.slice(0, 5)
    console.log('trimmed', newsArticles)
    return (
        <div>
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