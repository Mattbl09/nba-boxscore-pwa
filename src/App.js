import React, {useState} from 'react';
import {fetchGames} from './api/fetchData';
import './App.css';

const App = () => {
    const [date, setDate] = useState('');
    const [games, setGames] = useState({});

    const [showScore, setShowscore] = useState(true);
    
    const search = async (e) => {
        if(e.key === 'Enter') {
            const data = await fetchGames(date)

            console.log(data);
            setGames(data);
        }
    }

    return (
        <div className = "main-container">

                { showScore && <input type="date" className="search" placeholder="Search Date..." value={date} onChange={(e) => setDate(e.target.value)} onKeyPress={search}></input> }
                {games.data && showScore && (games.data.map(game => (
                <div key={game.id} className="score">
                    <table>
                        <tbody> 
                            <tr className="score-name">
                                <td style={{textAlign: 'right'}}>{game.home_team.full_name}:</td>
                                <td>{game.home_team_score}</td>
                                <td rowSpan="2"><button className="button" onClick={() => setShowscore(!showScore)}>boxscore</button></td>
                                <td></td>
                            </tr>
                            <tr className="score-name"> 
                                <td style={{textAlign: 'right'}}>{game.visitor_team.full_name}:</td>
                                <td>{game.visitor_team_score}</td>                            
                            </tr>
                        </tbody>
                    </table>
                </div>
                )))}
                {!showScore && <div>
                    <table className="boxscore-table">
                        <thead className="boxscore-table-headers">
                            <tr>
                                <th colSpan="14" >Home Team</th>
                            </tr>
                        </thead>
                        <thead>
                            <tr>
                                <th>Player Name</th>
                                <th>MIN</th>
                                <th>PTS</th>
                                <th>FG</th>
                                <th>3PT</th>
                                <th>FT</th>
                                <th>OREB</th>
                                <th>DREB</th>
                                <th>REB</th>
                                <th>AST</th>
                                <th>STL</th>
                                <th>BLK</th>
                                <th>TO</th>
                                <th>PF</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Test
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="boxscore-table">
                        <thead className="boxscore-table-headers">
                            <tr>
                                <th colSpan="14" >Visitor Team</th>
                            </tr>
                        </thead>
                        <thead>
                            <tr>
                                <th>Player Name</th>
                                <th>MIN</th>
                                <th>PTS</th>
                                <th>FG</th>
                                <th>3PT</th>
                                <th>FT</th>
                                <th>OREB</th>
                                <th>DREB</th>
                                <th>REB</th>
                                <th>AST</th>
                                <th>STL</th>
                                <th>BLK</th>
                                <th>TO</th>
                                <th>PF</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Test
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>}
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