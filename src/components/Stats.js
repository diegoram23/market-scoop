const Stats = ({ all}) => {
    const styles = {
        color: all.dp < 0 ? 'red' : 'green'
    }
    return (
        <main className="stats-container">
            {all.map((all, i) =>
                <section className="stats-card" key={i}>
                    <h2 className="stats-name">{all.name}</h2>
                    <p className="stats-percent" style={styles} >{all.dp.toFixed(2)}%</p>
                    <p className="stats-price">{all.c}</p>
                </section>
            )}
        </main>
    )
}

export default Stats;