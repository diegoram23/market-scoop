import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const About = () => {

    const params = useParams()
    const [tickerNews, setTickerNews] = useState([])
    const [profile, setProfile] = useState([])
    const [earnings, setEarnings] = useState([])
    const [quotes, setQuotes] = useState([])
    const [isPending, setIsPending] = useState(true)
    const [isError, setIsError] = useState(null)

    useEffect(() => {
        
            fetch(`https://finnhub.io/api/v1/company-news?symbol=${params.id}&from=2023-06-06&to=2024-06-06&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg`)
                .then(res => {
                    if (!res.ok) {
                        throw Error('Unable to fetch news')
                    }
                    return res.json()
                })
                .then(data => {

                    setTickerNews(data)
                    setIsError(null)
                })
                .catch(err => {
                    setIsPending(false)
                    setIsError(err.message);
                })

            fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${params.id}&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg`)
                .then(res => {
                    if (!res.ok) {
                        throw Error('Unable to fetch logo or name')
                    }
                    return res.json()
                })
                .then(data => {

                    setProfile(data)
                    setIsError(null)
                })
                .catch(err => {
                    setIsPending(false)
                    setIsError(err.message);
                })

            fetch(`https://finnhub.io/api/v1/stock/earnings?symbol=${params.id}&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg`)
                .then(res => {
                    if (!res.ok) {
                        throw Error('Unable to fetch earnings')
                    }
                    return res.json()
                })
                .then(data => {

                    setEarnings(data)
                    setIsError(null)
                })
                .catch(err => {
                    setIsPending(false)
                    setIsError(err.message);
                })
            fetch(`https://finnhub.io/api/v1/quote?symbol=${params.id}&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg`)
                .then(res => {
                    if (!res.ok) {
                        throw Error('Unable to fetch quotes')
                    }
                    return res.json()
                })
                .then(data => {
                    
                    setQuotes(data)
                    setIsError(null)
                })
                .catch(err => {
                    setIsPending(false)
                    setIsError(err.message);
                })
                setIsPending(false)

    }, [params.id])

    const newsArticles = tickerNews.slice(0, 4)

    const styles = {
        color: quotes.dp > 0 ? '#03c988' : '#ff0303'
    }

    return (
        <div className="about-container">
            {isError && <h3>{isError}</h3>}
            {profile && earnings[0] && quotes ? (
                <div className="profile-container">
                    <header>
                        <h3>{profile.name}</h3>
                        <h3 style={styles}>{quotes.c}</h3>
                        <h3 style={styles}>{Number(quotes.dp).toFixed(2)}%</h3>
                        <img  className="stock-img" src={profile.logo} />
                    </header>
                    <p><strong>Sector: </strong>{profile.finnhubIndustry}</p>
                    <p><strong>IPO date: </strong>{profile.ipo}</p>
                    <h3 className="earnings-heading">Previous Earnings</h3>
                    <p><strong>Estimated:</strong> {earnings[0].estimate.toFixed(2)} EPS</p>
                    <p><strong>Actual:</strong> {earnings[0].actual.toFixed(2)} EPS</p>
                    <p><strong>Date:</strong> Q{earnings[0].quarter} {earnings[0].year}</p>
                </div>
            ) : <h3>Loading {params.id} profile...</h3>}

            {isPending ? (
                <h3 className="loading">Loading {params.id} news...</h3>
            ) :
                <h2>{`${params.id} News`}</h2>}
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