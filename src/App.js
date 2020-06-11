import React, { useState } from "react";
import { fetchGames, fetchBoxscore } from "./api/fetchData";
import "./App.css";

const App = () => {
  const [date, setDate] = useState("");
  const [gameID, setGameID] = useState({});
  const [games, setGames] = useState({});

  const [showScore, setShowscore] = useState(true);

  const searchDate = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchGames(date);

      console.log(data);
      setGames(data);
    }
  };

  const boxscoreData = async (e) => {
    const data = await fetchBoxscore(gameID);

    console.log(data);
    setGameID(data);
  };

  /*
  const sorted = gameID.data.sort((a, b) => {
    return b.pts - a.pts;
  });
  */

  return (
    <div className="main-container">
      {showScore && (
        <input
          type="date"
          className="search"
          placeholder="Search Date..."
          value={date}
          onChange={(e) => setDate(e.target.value)}
          onKeyPress={searchDate}
        ></input>
      )}
      {games.data &&
        showScore &&
        games.data.map((game) => (
          <div key={game.id} className="score">
            <table>
              <tbody>
                <tr className="score-name">
                  <td style={{ textAlign: "right" }}>
                    {game.home_team.full_name}:
                  </td>
                  <td>{game.home_team_score}</td>
                  <td rowSpan="2">
                    <button
                      className="button"
                      onClick={(e) => {
                        setShowscore(!showScore);
                        boxscoreData(game.id);
                      }}
                    >
                      boxscore
                    </button>
                  </td>
                  <td></td>
                </tr>
                <tr className="score-name">
                  <td style={{ textAlign: "right" }}>
                    {game.visitor_team.full_name}:
                  </td>
                  <td>{game.visitor_team_score}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      {!showScore && gameID.data && (
        <div>
          <table className="boxscore-table">
            <thead className="boxscore-table-headers">
              <tr>
                <th colSpan="14">Home Team</th>
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
              {gameID.data
                .sort(
                  ({ pts: previousPTS }, { pts: currentPTS }) =>
                    currentPTS - previousPTS
                )
                .map((gameID) => (
                  <tr key={gameID.id}>
                    <th>
                      {gameID.player.first_name} {gameID.player.last_name}
                    </th>
                    <th>{gameID.min}</th>
                    <th>{gameID.pts}</th>
                  </tr>
                ))}
            </thead>
            <tbody>
              <tr>
                <td>Test</td>
              </tr>
            </tbody>
          </table>
          <table className="boxscore-table">
            <thead className="boxscore-table-headers">
              <tr>
                <th colSpan="14">Visitor Team</th>
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
              {gameID.data.map((gameID) => (
                <tr key={gameID.id}></tr>
              ))}
            </thead>
            <tbody>
              <tr>
                <td>Test</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
