const Stats = ({ all }) => {

    return (
        <div className="stats-container">
            {all.map((all, i) =>
                <section className="stats-card" key={i}>
                    <h2 className="stats-name">{all.name}</h2>
                    <p className="stats-percent" style={{color: all.dp > 0 ? 'green' : 'red'}} >{all.dp.toFixed(2)}%</p>
                    <p className="stats-price">{all.c}</p>
                </section>
            )}
        </div>
    )
}

export default Stats;