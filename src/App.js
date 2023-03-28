import { HashRouter, Routes, Route } from 'react-router-dom'

//   pages
import Home from './pages/Home';
import About from './pages/About';
import Watchlist from './pages/Favorites';
import Footer from './components/Footer';

//Layouts
import Header from './layouts/HeaderLayout';

export default function App() {

    return (
        <div className='app'>
            <HashRouter>
                <Routes>
                    <Route element={<Header />}>
                        <Route path='/' element={<Home />} />
                        <Route path='/about/:id' element={<About />} />
                        <Route path='/watchlist' element={<Watchlist />}></Route>
                    </Route>
                </Routes>
            </HashRouter>
            <Footer />
        </div>
    );
}



