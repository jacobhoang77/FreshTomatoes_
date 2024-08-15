import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './App.css';

const Home = lazy(() => import('./pages/Home'));
const MovieList = lazy(() => import('./pages/MovieList')); 
const SearchPage = lazy(() => import('./SearchPage'));
const SurpriseMe = lazy(() => import('./SurpriseMe'));  
const RandomQuizGame = lazy(() => import('./Quiz'));   
const PopularPeople = lazy(() => import('./pages/PopularP'));  
const Reviews = lazy(() => import('./pages/Reviews'));  
const Login = lazy(() => import('./Login'));  

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
              <Route path="/search" element={<SearchPage />} />
              <Route path="/surpriseme" element={<SurpriseMe />} />  
              <Route path="/quiz" element={<RandomQuizGame />} />  
              <Route path="/popular-people" element={<PopularPeople />} />
              <Route path="/reviews" element={<Reviews />} /> 
              <Route path="/login" element={<Login />} /> 
              <Route path="*" element={<Home />} /> 
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </>
    </Router>
  );
}

export default App;
