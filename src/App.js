import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from './api';
import './App.css';
import EntryDetail from './EntryDetail';
import EntryForm from './EntryForm';
import EntrySearchText from './EntrySearchText';

const App = () => {
  const [entry, setEntry] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get('green_diary/')
      .then(response => {
        setEntry(response.data);
      })
      .catch(error => console.error("There was an error fetching the entry data", error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`green_diary/${id}/delete/`)
      .then(() => {
        setEntry(entry.filter(entry => entry.id !== id));
      })
      .catch(error => console.error("There was an error deleting the Entry data", error));
  };

  return (
    <div className="body">
      <h1>The Green Diary</h1>

      <EntryForm entries={entry} setEntries={setEntry} />

      <EntrySearchText 
        searchText={searchQuery} 
        setSearchText={setSearchQuery} 
        setEntries={setEntry}
      />

      <ul>
        {entry.map((item) => (
          <li key={item.id}>
            <Link to={`/entry/${item.id}`}>
              {item.text} - {new Date(item.timestamp).toLocaleString()}
            </Link>
            <button onClick={() => handleDelete(item.id)}>Delete entry</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const MainApp = () => (
  <Router>
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/entry/:id" element={<EntryDetail />} />
    </Routes>
  </Router>
)

export default MainApp;