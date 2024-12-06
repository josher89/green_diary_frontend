import React, { useState } from 'react';
import axios from './api';

const EntrySearchText = ({ searchText, setSearchText, setEntries }) => {
    const [months, setMonths] = useState("")
    const [years, setYears] = useState("")

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchText(query);
    
        if (query.trim() !== "") {
          axios.get(`green_diary/?search=${query}`)
          .then(response => {
            setEntries(response.data);
          })
          .catch(error => console.error("There was an error searching the entry data", error)
          );
        }
      };

    const handleFilterSubmit = () => {
        const params = new URLSearchParams();
        if (searchText) params.append("search", searchText);
        if (months) params.append("month", months);
        if (years) params.append("year", years);
    
        axios.get(`green_diary/?${params.toString()}`)
        .then(response => setEntries(response.data))
        .catch(error => console.error("Error searching entries", error));
      };
    
    
      return (
        <div>
            <form onSubmit={(e) => { e.preventDefault(); handleFilterSubmit(); }}>
                    <input
                    type="text"
                    value={searchText}
                    onChange={handleSearch}
                    placeholder="Search entries by title or text"
                    />
        
                    <select value={months} onChange={(e) => setMonths(e.target.value)}>
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
        
                    <select value={years} onChange={(e) => setYears(e.target.value)}>
                        <option value="">Select Year</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                    </select>
        
                <button type="submit">Filter</button>
            </form>
        </div>
      );
}

export default EntrySearchText;