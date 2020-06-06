import React, {useState} from 'react';

import {fetchGames} from './api/fetchData';
import './App.css';

const App = () => {
    const [date, setDate] = useState('');
    const [games, setGames] = useState({});

    const search = async (e) => {
        if(e.key === 'Enter') {
            const data = await fetchGames(date)

            setGames(data);
            console.log(data);
            setDate('');
        }
    }

    return (
        <div className = "main-container">
            <input
                type="text" className="search" placeholder="Search Date..." value={date} onChange={(e) => setDate(e.target.value)} onKeyPress={search}/>
        </div>
    )
}

export default App;