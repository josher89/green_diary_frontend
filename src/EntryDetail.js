import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from './api';
import './App.css';

const EntryDetail = () => {
    const { id } = useParams();
    const [ entry, setEntry ] = useState(null);

    useEffect(() => {
        axios.get(`green_diary/${id}/`)
        .then(response => {
            setEntry(response.data);
        })
        .catch(error => console.error("Error fetching entry detail", error));
    }, [id]);

    if (!entry) return <div>Loading...</div>;

    return (
        <div className='entryBody'>
            <h1>{entry.title}</h1>
            <p>{entry.text}</p>
            <p>{new Date(entry.timestamp).toLocaleString()}</p>
        </div>
    );
};

export default EntryDetail;