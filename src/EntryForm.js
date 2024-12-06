import React, { useState } from 'react';
import axios from './api';

const EntryForm = ({ entries, setEntries }) => {
    // control test
    //console.log("entries:", entries, 'setEntries:', setEntries);
    const [newEntry, setNewEntry] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newEntry.trim() !== "") {
            setLoading(true);
            setError(null);
          axios.post('green_diary/', { text: newEntry })
            .then(response => {
              setEntries(prevEntries => [response.data, ...prevEntries]);
              setNewEntry("");
            })
            .catch(error => {
                console.error("There was an error fetching the entry data; you got bupkis.", error.response ? error.response.data : error.message);
                setError("Failed to submit entry. Please try again.");
            })
            .finally(() => setLoading(false));
        }
    };


    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                placeholder="Write your thoughts down"
                disabled={loading}
                />
                {/* add a className to style the button */}
                <button type="submit" disabled={loading}>{loading ? "Sending..." : "Send Entry"}</button>
            </form>
        </div>
    );
};

export default EntryForm;
