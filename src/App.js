import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from './api';
import './App.css';
import EntryDetail from './EntryDetail';

const App = () => {
  const [entry, setEntry] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  // New code
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    axios.get('green_diary/')
      .then(response => {
        // Remove this line after debuggig:
        console.log(response.data);
        setEntry(response.data);
      })
      .catch(error => console.error("There was an error fetching the entry data", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newEntry.trim() !== "") {
      axios.post('green_diary/', { text: newEntry })
        .then(response => {
          // Remove this line after debugging:
          console.log(response.data);
          setEntry([response.data, ...entry]);
          setNewEntry("");
        })
        .catch(error => console.error("There was an error fetching the entry data", error));
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() !== "") {
      axios.get(`green_diary/?search=${query}`)
      .then(response => {
        setEntry(response.data);
      })
      .catch(error => console.error("There was an error searching the entry data", error)
      );
    }
  };

  // New code
  const handleFilterSubmit = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.append("search", searchQuery);
    if (month) params.append("month", month);
    if (year) params.append("year", year);

    axios.get(`green_diary/?${params.toString()}`)
    .then(response => setEntry(response.data))
    .catch(error => console.error("Error searching entries", error));
  };

  // Old code
  // const handleSearchSubmit = () => {
  //   axios.get(`green_diary/?search=${searchQuery}`)
  //   .then(response => {
  //     setEntry(response.data);
  //   })
  //   .catch(error => console.error("Error searching entries", error));
  // };

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

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="Write your thoughts down"
        />
        <button type="submit">Send Entry</button>
      </form>

      <form onSubmit={(e) => { e.preventDefault(); handleFilterSubmit(); }}> {/*handleSearchSubmit() was commented out.*/}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search entries by title or text"
        />

        <select value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="">Select Month</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>

          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">Select Year</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>

        <button type="submit">Filter</button>
      </form>

      <ul>
        {entry.map((entry) => (
          <li key={entry.id}>
            <Link to={`/entry/${entry.id}`}>
              {entry.text} - {new Date(entry.timestamp).toLocaleString()}
            </Link>
            <button onClick={() => handleDelete(entry.id)}>Delete entry</button>
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