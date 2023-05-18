import Stats from "../components/Stats"
import useFetchHome from "../components/useFetchHome"

const Home = () => {

    //Fetches the tops news and four tickers on homepage from useFetchHome component
    const { all, marketNews, isPending, error } = useFetchHome()

    //Filters the news to 'top news' and limits quantity to 7
    const techNews = marketNews.filter(news => news.category === 'top news')

    return (
        <>
         {isPending && <h3 className="loading">Loading Data..</h3>}
            <Stats
                all={all}
            />
<div className="grid">
{isPending && <h3 className="loading">Loading Data..</h3>}
            {techNews.map(news =>
            <div className='news-container' key={news.id}>
                <a href={news.url}><h4 className="news-headline">{news.headline}</h4></a>
                <a href={news.url}> <img className='news-image' alt='user uploaded content' src={news.image} /> </a>
                <p className="news-time"> {new Date(news.datetime * 1000).toLocaleString("en-us", { hour: '2-digit', minute: '2-digit' })}</p>
                <p className="news-summary">{news.summary}</p>
            </div>)}
</div>
       
        </>
    );
}

export default Home;