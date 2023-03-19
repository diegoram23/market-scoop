import { useState, useEffect } from "react"
import axios from "axios"
import Stats from "../components/Stats"

const Home = () => {

    //React state variables
    const [marketNews, setMarketNews] = useState([])
    const [all, setAll] = useState([])

    //Fetches the quotes of four tickers
    const getData = async () => {
        const urls = [
            'https://finnhub.io/api/v1/quote?symbol=qqq&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg',
            'https://finnhub.io/api/v1/quote?symbol=spy&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg',
            'https://finnhub.io/api/v1/quote?symbol=dia&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg',
            'https://finnhub.io/api/v1/quote?symbol=enz&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg'
        ]
        const promises = urls.map(url => axios.get(url))
        const results = await Promise.all(promises)
       //using object.assign to give each object a name of the ticker
        const data1 = Object.assign(results[0].data, {name: 'QQQ'})
        const data2 = Object.assign(results[1].data, {name: 'SPY'})
        const data3 = Object.assign(results[2].data, {name: 'DIA'})
        const data4 = Object.assign(results[3].data, {name: 'AAPL'})
        return [data1, data2, data3, data4]
    }

    useEffect(() => {
        getData()
            .then(data => {
                setAll(data)
            })
            //Fetches the top news
        axios
            .get(`https://finnhub.io/api/v1/news?category=general?&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg`)
            .then(res => {
                const sevenArticles = res.data.slice(0, 7)
                setMarketNews(sevenArticles)
            })
    }, [])
console.log(all);
    //Filters the news to 'top news' and limits quantity to 7
    const techNews = marketNews.filter(news => news.category === 'top news')
    return (
        <div>
            <Stats
                all={all}
            />

            {techNews.map(news =>
                <div className='news-container' key={news.id}>
                    <a href={news.url}><h4 className="news-headline">{news.headline}</h4></a>
                    <a href={news.url}> <img className='news-image' alt='user uploaded content' src={news.image} /> </a>
                    <p className="news-time"> {new Date(news.datetime * 1000).toLocaleString("en-us", { hour: '2-digit', minute: '2-digit' })}</p>
                    <p className="news-summary">{news.summary}</p>
                </div>)}
        </div>
    );
}

export default Home;