const HomeNews = ({techNews}) => {
    return ( 
        <div>
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
 
export default HomeNews;