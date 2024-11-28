// import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [entry, setEntry] = useState([]);
  const [newEntry, setNewEntry] = useState("");

  useEffect(() => {
    axios.get('http://localhost:8000/api/green_diary/')
      .then(response => {
        setEntry(response.data);
      })
      .catch(error => console.error("There was an error fetching the entry data", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newEntry.trim() !== "") {
      axios.post('http://localhost:8000/api/green_diary/', { text: newEntry })
        .then(response => {
          setEntry([response.data, ...entry]);
          setNewEntry("");
        })
        .catch(error => console.error("There was an error fetching the entry data", error));
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/green_diary/${id}/`)
      .then(() => {
        setEntry(entry.filter(entry => entry.id !== id));
      })
      .catch(error => console.error("There was an error deleting the Entry data", error));
  };

  return (
    <div class="body">
      <h1>The Green Diary</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="Write your thoughts down"
        />
        <button type="submit">Send Entry</button>
      </form>

      <ul>
        {entry.map((entry) => (
          <li key={entry.id}>
            {entry.text} - {new Date(entry.timestamp).toLocaleString()}
            <button onClick={() => handleDelete(entry.id)}>Delete entry</button>
          </li>
        ))}
      </ul>

      <h1>{entry.text}</h1>

    </div>
  );
}

export default App;
