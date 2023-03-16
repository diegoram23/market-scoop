import { Outlet, NavLink } from "react-router-dom";

const HelpLayout = () => {
    return (
        <div>
            <h2>help layout</h2>
            <p>Broooo you need some helpis</p>

            <nav>
                <NavLink to='faq'>FAQ</NavLink>
            </nav>
            <Outlet />
        </div>
    );
}

export default HelpLayout;