import React, { useState } from "react";
import axios from "axios";

const DiaryForm = ({ onEntryAdded }) => {
    const [newEntry, setNewEntry] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newEntry.trim() !== "") {
          axios.post('green_diary/', { text: newEntry })
            .then(response => {
              // Remove this line after debugging:
              console.log(response.data);
              onEntryAdded(response.data);
              setNewEntry("");
            })
            .catch(error => console.error("There was an error fetching the entry data", error));
        }
      };

    return (
      <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newEntry}
        onChange={(e) => setNewEntry(e.target.value)}
        placeholder="Dear Diary"
      />
      <button type="submit">End Entry</button>
    </form>
    );
};

export default DiaryForm