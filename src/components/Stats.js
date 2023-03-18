const Stats = ({ qqq, aapl, spy, dia }) => {

    const styles = {
        color: qqq.dp < 0 ? 'red' : 'green'
    }
    
    return (
        <main className="stats-container">
            <section className="stats-card" >
                <h2 className="stats-name">QQQ</h2>
                <p className="stats-percent" style={styles}>{Number(qqq.dp).toFixed(2)}%</p>
                <p className="stats-price">{qqq.c}</p>
            </section>
            <section className="stats-card">
                <h2 className="stats-name">AAPL</h2>
                <p className="stats-percent">{Number(aapl.dp).toFixed(2)}%</p>
                <p className="stats-price">{aapl.c}</p>
            </section>
            <section className="stats-card">
                <h2 className="stats-name">SPY</h2>
                <p className="stats-percent">{Number(spy.dp).toFixed(2)}%</p>
                <p className="stats-price">{spy.c}</p>
            </section>
            <section className="stats-card">
                <h2 className="stats-name">DIA</h2>
                <p className="stats-percent">{Number(dia.dp).toFixed(2)}%</p>
                <p className="stats-price">{dia.c}</p>
            </section>
        </main>
    )
}

export default Stats;