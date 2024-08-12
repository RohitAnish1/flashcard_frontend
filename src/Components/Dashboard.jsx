import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [form, setForm] = useState({ question: '', answer: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/flashcards').then((response) => {
      setFlashcards(response.data);
    });
  }, []);

  const handleSubmit = () => {
    if (editId) {
      axios.put(`'http://localhost:5000/api/flashcards'/${editId}`, form).then(() => {
        setFlashcards(flashcards.map((fc) => (fc.id === editId ? form : fc)));
        setEditId(null);
        setForm({ question: '', answer: '' });
      });
    } else {
      axios.post('http://localhost:5000/api/flashcards', form).then((response) => {
        setFlashcards([...flashcards, { ...form, id: response.data.id }]);
        setForm({ question: '', answer: '' });
      });
    }
  };

  const handleEdit = (flashcard) => {
    setForm({ question: flashcard.question, answer: flashcard.answer });
    setEditId(flashcard.id);
  };

  const handleDelete = (id) => {
    axios.delete(`'http://localhost:5000/api/flashcards'/${id}`).then(() => {
      setFlashcards(flashcards.filter((fc) => fc.id !== id));
    });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>
      <div className="dashboard-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Question"
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
          />
          <input
            type="text"
            placeholder="Answer"
            value={form.answer}
            onChange={(e) => setForm({ ...form, answer: e.target.value })}
          />
          <button type="submit">{editId ? 'Edit' : 'Add'} Flashcard</button>
        </form>
      </div>
      <div className="flashcards-list">
        <ul>
          {flashcards.map((fc) => (
            <li key={fc.id}>
              {fc.question} - {fc.answer}
              <button className="edit-btn" onClick={() => handleEdit(fc)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(fc.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
