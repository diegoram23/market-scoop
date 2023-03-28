import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <>
        <h1 className="notfound-title">Sorry, the page you were looking for was not found.</h1>
        <Link to='/' className="notfound-link">Return home</Link>
        </>
    );
}

export default NotFound