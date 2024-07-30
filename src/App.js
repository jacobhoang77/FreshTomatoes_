import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Corrected import statement
import Header from './Header';
import Footer from './Footer';
import Home from './pages/Home';
import MovieList from './pages/MovieList';
import MovieDetail from './pages/MovieDetail';
import SearchResults from './pages/SearchResult';
import Favorites from './pages/Favorites';
import Watchlist from './pages/Watchlist';
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
