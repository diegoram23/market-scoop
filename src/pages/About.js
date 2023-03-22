import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

const About = ({ tickerName }) => {

    const params = useParams()
    const [tickerNews, setTickerNews] = useState([])
    const [profile, setProfile] = useState([])
    const [earnings, setEarnings] = useState([])
    const [quotes, setQuotes] = useState([])

    useEffect(() => {
        axios
            .get(`https://finnhub.io/api/v1/company-news?symbol=${tickerName}&from=2023-01-01&to=2023-03-03&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg`)
            .then(res => setTickerNews(res.data))
        axios
            .get(`https://finnhub.io/api/v1/stock/profile2?symbol=${tickerName}&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg`)
            .then(res => setProfile(res.data))
        axios
            .get(`https://finnhub.io/api/v1/stock/earnings?symbol=${tickerName}&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg`)
            .then(res => {
                setEarnings(res.data)
            })
        axios.get(`https://finnhub.io/api/v1/quote?symbol=${tickerName}&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg`)
            .then(res => setQuotes(res.data))

    }, [params.id])

    const newsArticles = tickerNews.slice(0, 4)

    const styles = {
        color: quotes.dp > 0 ? '#03c988' : '#ff0303'
    }

    return (
        <div className="about-container">

            {profile && earnings[0] ? (
                <div className="profile-container">
                    <header>
                        <h3>{profile.name}</h3>
                        <h3 style={styles}>{quotes.c.toFixed(2)}</h3>
                        <h3 style={styles}>{quotes.dp.toFixed(2)}%</h3>
                        <img src={profile.logo} />
                    </header>
                    <p><strong>Sector: </strong>{profile.finnhubIndustry}</p>
                    <p><strong>IPO date: </strong>{profile.ipo}</p>
                    <h3 className="earnings-heading">Previous Earnings</h3>
                    <p><strong>Estimated:</strong> {earnings[0].estimate.toFixed(2)} EPS</p>
                    <p><strong>Actual:</strong> {earnings[0].actual.toFixed(2)} EPS</p>
                    <p><strong>Date:</strong> Q{earnings[0].quarter} {earnings[0].year}</p>
                </div>
            ) : <p>Loading...</p>}

            <h2>{`${tickerName} News`}</h2>
            {newsArticles.map(article =>
                <article className='news-container' key={article.id}>
                    <a href={article.url}> <h4 className="news-headline">{article.headline}</h4> </a>
                    <a href={article.url}> <img className='news-image' alt='user uploaded content' src={article.image} /> </a>
                    <p className="news-time"> {new Date(article.datetime * 1000).toLocaleString("en-us", { hour: '2-digit', minute: '2-digit' })}</p>
                    <p className="news-summary">{article.summary}</p>
                </article>)}
        </div>
    )
}

export default About