import { useEffect, useState } from "react"
import axios from "axios"

const useFetchHome = () => {
    const [marketNews, setMarketNews] = useState([])
    const [all, setAll] = useState([])
    const [isPending, setIsPending] = useState(true)

    const getData = async () => {
        const urls = [
            'https://finnhub.io/api/v1/quote?symbol=qqq&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg',
            'https://finnhub.io/api/v1/quote?symbol=spy&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg',
            'https://finnhub.io/api/v1/quote?symbol=dia&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg',
            'https://finnhub.io/api/v1/quote?symbol=aapl&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg'
        ]
        const promises = urls.map(url => axios.get(url))
        const results = await Promise.all(promises)
        //using object.assign to give each object a name of the ticker
        const data1 = Object.assign(results[0].data, { name: 'QQQ' })
        const data2 = Object.assign(results[1].data, { name: 'SPY' })
        const data3 = Object.assign(results[2].data, { name: 'DIA' })
        const data4 = Object.assign(results[3].data, { name: 'AAPL' })
        return [data1, data2, data3, data4]
    }

    useEffect(() => {
     
            getData()
                .then(data => {
                    setAll(data)
                    setIsPending(false)
                })
            //Fetches the top news
            axios
                .get(`https://finnhub.io/api/v1/news?category=general?&token=cg9703hr01qk68o7vqc0cg9703hr01qk68o7vqcg`)
                 .then(res => {
                        //Cuts down data to only 8 articles
                        const eightArticles = res.data.slice(0, 8)
                        setMarketNews(eightArticles)
                        setIsPending(false)
                })
    }, [])

    return { marketNews, all, isPending }

}

export default useFetchHome