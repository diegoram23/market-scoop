import { useState, useEffect } from "react"
import axios from "axios"
import Stats from "../components/Stats"
const Home = () => {

    //React state variables
    const [marketNews, setMarketNews] = useState([])
    const [qqq, setQqq] = useState([])
    const [aapl, setAapl] = useState([])
    const [spy, setSpy] = useState([])
    const [dia, setDia] = useState([])

    //Fetches news once user visits this home page
    useEffect(() => {
        axios
            .get(`https://finnhub.io/api/v1/news?category=general?&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg`)
            .then(res => {
                const sevenArticles = res.data.slice(0, 7)
                setMarketNews(sevenArticles)
            })
            //Fetches price quotes on each individual ticker (qqq, aapl, spy, dia)
        axios.get('https://finnhub.io/api/v1/quote?symbol=qqq&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg')
            .then(res => {
                setQqq(res.data)
            })
        axios.get('https://finnhub.io/api/v1/quote?symbol=aapl&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg')
            .then(res => {
                setAapl(res.data)
            })
        axios.get('https://finnhub.io/api/v1/quote?symbol=spy&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg')
            .then(res => {
                setSpy(res.data)
            })
        axios.get('https://finnhub.io/api/v1/quote?symbol=dia&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg')
            .then(res => {
                setDia(res.data)
            })
    }, [])
    //Filters the news to 'top news' and limits quantity to 7
    const techNews = marketNews.filter(news => news.category === 'top news')

    return (
        //Displays the prices of the four tickers above and the top news from fetch requests
        <div>
            
            <Stats
                qqq={qqq}
                aapl={aapl}
                spy={spy}
                dia={dia}
            />

            {techNews.map(news =>
                <div className='news-container' key={news.id}>
                    <a href={news.url}><h4 className="news-headline">{news.headline}</h4></a>
                    <a href={news.url}> <img className='news-image' src={news.image} /> </a>
                    <p className="news-time"> {new Date(news.datetime * 1000).toLocaleString("en-us")}</p>
                    <p className="news-summary">{news.summary}</p>
                </div>)}

        </div>
    );
}

export default Home;