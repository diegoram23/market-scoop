const Notification = ({ added, duplicate }) => {
    if (added !== null) {
        return <p className="added-message">{added}</p>
    }

    if (duplicate !== null) {
        return <p className="duplicate-message">{duplicate}</p>
    }
    return (
        <>
        </>
    );
}

export default Notification;