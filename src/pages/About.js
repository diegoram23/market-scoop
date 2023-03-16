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
            <p>{tickerName}</p>
        </div>
    );
}

export default About;