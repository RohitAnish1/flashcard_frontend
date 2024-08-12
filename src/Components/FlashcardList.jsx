import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
import axios from 'axios';
import './FlashcardList.css';

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/api/flashcards')
      .then((response) => {
        setFlashcards(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the flashcards!', error);
      });
  }, []);

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="flashcard-list-container">
      {flashcards.length > 0 && (
        <Flashcard
          question={flashcards[currentIndex].question}
          answer={flashcards[currentIndex].answer}
        />
      )}
      <div className="button-container">
        <button className="prev-button" onClick={prevCard}>Previous</button>
        <button className="next-button" onClick={nextCard}>Next</button>
      </div>
    </div>
  );
};

export default FlashcardList;
