import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Login from './Login'; 
import './App.css'; 

const Home = lazy(() => import('./pages/Home'));
const MovieList = lazy(() => import('./pages/MovieList'));
const MovieDetail = lazy(() => import('./pages/MovieDetail'));
const SearchPage = lazy(() => import('./SearchPage'));  
const Favorites = lazy(() => import('./pages/Favorites'));
const Watchlist = lazy(() => import('./pages/Watchlist'));

function App() {
  return (
    <Router>
      <>
        <Header />
        <main>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<MovieList />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/search" element={<SearchPage />} /> 
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/login" element={<Login/>} /> 
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </>
    </Router>
  );
}

export default App;
