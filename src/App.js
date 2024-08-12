import React from 'react';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import FlashcardList from './Components/FlashcardList';
import Flashcard from './Components/Flashcard';
import Dashboard from './Components/Dashboard';
import './App.css'; 

function App() {
    return (
        <Router>
           <nav>
                <Link to="/">Flashcards</Link>
                <Link to="/Dashboard">Dashboard</Link> {/* Ensure 'Dashboard' is capitalized here */}
            </nav>
            <Routes>
                <Route path="/" element={<FlashcardList />} />
                <Route path="/flashcard/:id" element={<Flashcard />} />
                <Route path="/Dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
