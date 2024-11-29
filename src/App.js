import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from './api';
import './App.css';
import EntryDetail from './EntryDetail';

const App = () => {
  const [entry, setEntry] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get('green_diary/')
      .then(response => {
        setEntry(response.data);
      })
      .catch(error => console.error("There was an error fetching the entry data", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newEntry.trim() !== "") {
      axios.post('green_diary/', { text: newEntry })
        .then(response => {
          setEntry([response.data, ...entry]);
          setNewEntry("");
        })
        .catch(error => console.error("There was an error fetching the entry data", error));
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    axios.get(`green_diary/?search=${query}`)
    .then(response => {
      setEntry(response.data);
    })
    .catch(error => console.error("There was an error searching the entry data", error));
  };

  const handleDelete = (id) => {
    axios.delete(`green_diary/${id}/`)
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

      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search entries by title or text"
      />

      <ul>
        {entry.map((entry) => (
          <li key={entry.id}>
            {entry.text} - {new Date(entry.timestamp).toLocaleString()}
            <button onClick={() => handleDelete(entry.id)}>Delete entry</button>
          </li>
        ))}
      </ul>

      <h1>{entry.length}</h1>

    </div>
  );
}

export default App;
