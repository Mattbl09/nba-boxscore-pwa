import React, { useState } from "react";
import { fetchGames, fetchBoxscore } from "./api/fetchData";
import "./App.css";

const App = () => {
  //states for scoreboard
  const [date, setDate] = useState("");
  const [games, setGames] = useState({});
  //states for boxscore
  const [gameID, setGameID] = useState("");
  const [boxscore, setBoxscore] = useState({});

  const [showScore, setShowscore] = useState(true);

  const searchDate = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchGames(date);

      //console.log(data, "<--- games data");
      setGames(data);
    }
  };

  const boxscoreData = async (gameID) => {
    const data = await fetchBoxscore(gameID);

    console.log(data, "<--- boxscore data");
    setBoxscore(data);
  };

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
                      value={game.id}
                      onClick={(e) => {
                        setGameID(e.target.value);
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
      {!showScore && boxscore.data && (
        <div>
          <table className="boxscore-table">
            <thead className="boxscore-table-headers">
              <tr>
                <th colSpan="14">Home Team</th>
              </tr>
            </thead>
            <thead>
              <tr className="boxscore-stat-headers">
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
              {boxscore.data
                .filter(
                  (homeTeam) =>
                    homeTeam.game.home_team_id === homeTeam.player.team_id
                )
                .sort(
                  ({ pts: previousPTS }, { pts: currentPTS }) =>
                    currentPTS - previousPTS
                )
                .map((boxscore) => (
                  <tr key={boxscore.id}>
                    <th>
                      {boxscore.player.first_name} {boxscore.player.last_name}
                    </th>
                    <th>{boxscore.min}</th>
                    <th>{boxscore.pts}</th>
                    <th>{boxscore.fgm}</th>
                    <th>{boxscore.fg3m}</th>
                    <th>{boxscore.ftm}</th>
                    <th>{boxscore.oreb}</th>
                    <th>{boxscore.dreb}</th>
                    <th>{boxscore.reb}</th>
                    <th>{boxscore.ast}</th>
                    <th>{boxscore.stl}</th>
                    <th>{boxscore.blk}</th>
                    <th>{boxscore.turnover}</th>
                    <th>{boxscore.pf}</th>
                  </tr>
                ))}
            </thead>
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
              {boxscore.data
                .filter(
                  (visitorTeam) =>
                    visitorTeam.game.visitor_team_id ===
                    visitorTeam.player.team_id
                )
                .sort(
                  ({ pts: previousPTS }, { pts: currentPTS }) =>
                    currentPTS - previousPTS
                )
                .map((boxscore) => (
                  <tr key={boxscore.id}>
                    <th>
                      {boxscore.player.first_name} {boxscore.player.last_name}
                    </th>
                    <th>{boxscore.min}</th>
                    <th>{boxscore.pts}</th>
                    <th>{boxscore.fgm}</th>
                    <th>{boxscore.fg3m}</th>
                    <th>{boxscore.ftm}</th>
                    <th>{boxscore.oreb}</th>
                    <th>{boxscore.dreb}</th>
                    <th>{boxscore.reb}</th>
                    <th>{boxscore.ast}</th>
                    <th>{boxscore.stl}</th>
                    <th>{boxscore.blk}</th>
                    <th>{boxscore.turnover}</th>
                    <th>{boxscore.pf}</th>
                  </tr>
                ))}
            </thead>
            <tbody></tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
