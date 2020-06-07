import React, {useState} from 'react';

import {fetchGames} from './api/fetchData';
import './App.css';

let today = new Date();
console.log(today);

const App = () => {
    const [date, setDate] = useState('');
    const [games, setGames] = useState({});
    
    const search = async (e) => {
        if(e.key === 'Enter') {
            const data = await fetchGames(date)

            console.log(data);
            setGames(data);
            setDate('');
        }
    }

    return (
        <div className = "main-container">
            <input type="text" className="search" placeholder="Search Date..." value={date} onChange={(e) => setDate(e.target.value)} onKeyPress={search}></input>
                {games.data && (games.data.map(game => (
                <div key={game.id} className="score">
                    <table>
                        <tbody> 
                            <tr className="score-name">
                                <th style={{textAlign: 'right'}}>{game.home_team.full_name}:</th>
                                <th>{game.home_team_score}</th>
                            </tr>
                            <tr className="score-name"> 
                                <th style={{textAlign: 'right'}}>{game.visitor_team.full_name}:</th>
                                <th>{game.visitor_team_score}</th>                            
                            </tr>
                        </tbody>
                    </table>
                </div>
                )))}
        </div>

        /*
        <div className = "main-container">
            <input
                type="text" className="search" placeholder="Search Date..." value={date} onChange={(e) => setDate(e.target.value)} onKeyPress={search}/>
                {games.data && (
                    <div className="score"> 
                        <h2 className="score-name">
                            <span key={games.id}>{games.data.home_team}</span>
                            <sup key={games.id}>{games.data.home_team}</sup>                            
                        </h2>
                    </div>
                )}
        </div>
        */
    )
}

export default App;