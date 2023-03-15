import { NavLink, Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <div className="root-layout">
            <header>
                <nav>
                    <h2>Stock Market News</h2>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='about'>About</NavLink>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default RootLayout;