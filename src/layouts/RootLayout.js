import { NavLink, Outlet } from "react-router-dom";
import axios from "axios";
import SearchForm from "../SearchForm";

const RootLayout = () => {

    return (
        <div className="root-layout">
            <header>
                <h2>Stock Market News</h2>
                <nav>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='about'>About</NavLink>
                    <NavLink to='help'>Help</NavLink>
                </nav>
                
            </header>

            <main>
                <SearchForm />
                <Outlet />
            </main>
        </div>
    );
}

export default RootLayout;