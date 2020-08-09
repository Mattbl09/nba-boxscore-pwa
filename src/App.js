import React, { useState, useEffect } from "react";
import { fetchGames, fetchBoxscore } from "./api/fetchData";
import "./App.css";

const App = () => {

  let fullDate = new Date();
  const shortDate = fullDate.toISOString().split('T')[0]
  console.log(shortDate);

  useEffect(() => {
    searchDate(shortDate);
  }, []);

  //states for scoreboard
  const [date, setDate] = useState(shortDate);
  const [games, setGames] = useState({});
  //states for boxscore
  const [gameID, setGameID] = useState("");
  const [boxscore, setBoxscore] = useState({});

  const [showScore, setShowscore] = useState(true);

  const searchDate = async (date) => {
    const data = await fetchGames(date);
    //console.log(data)
    setGames(data);
  };

  const boxscoreData = async (gameID) => {
    const data = await fetchBoxscore(gameID);

    //console.log(data, "<--- boxscore data");
    setBoxscore(data);
  };

  return (
    <div className="main-container">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      {showScore && (
        <input
          type="date"
          className="search"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            searchDate(e.target.value);
          }}
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
                  <td style={{ textAlign: "right" }}>{game.home_team_score}</td>
                  <td rowSpan="2">
                    <button
                      className="boxscore-button"
                      value={gameID}
                      onClick={(e) => {
                        setGameID(e.target.value);
                        setShowscore(!showScore);
                        boxscoreData(game.id);
                      }}
                    >
                      boxscore
                    </button>
                    <td>
                      {game.status}
                    </td>
                  </td>
                </tr>
                <tr className="score-name">
                  <td style={{ textAlign: "right" }}>
                    {game.visitor_team.full_name}:
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {game.visitor_team_score}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      {!showScore && boxscore.data && (
        <div>
          <button
            className="scoreboard-button"
            onClick={(e) => {
              setShowscore(!showScore);
            }}
          >
            Back to Scores
          </button>
          <table className="boxscore-table">
            <thead className="boxscore-table-headers">
              <tr>
                <th colSpan="14">Home Team</th>
              </tr>
            </thead>
            <thead>
              <tr className="boxscore-stat-headers">
                <th>Player Name</th>
                <th>Team</th>
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
                    <th>{boxscore.team.abbreviation}</th>
                    <th>{boxscore.min}</th>
                    <th className="boxscore-stats">{boxscore.pts}</th>
                    <th className="boxscore-stats">{boxscore.fgm}</th>
                    <th className="boxscore-stats">{boxscore.fg3m}</th>
                    <th className="boxscore-stats">{boxscore.ftm}</th>
                    <th className="boxscore-stats">{boxscore.oreb}</th>
                    <th className="boxscore-stats">{boxscore.dreb}</th>
                    <th className="boxscore-stats">{boxscore.reb}</th>
                    <th className="boxscore-stats">{boxscore.ast}</th>
                    <th className="boxscore-stats">{boxscore.stl}</th>
                    <th className="boxscore-stats">{boxscore.blk}</th>
                    <th className="boxscore-stats">{boxscore.turnover}</th>
                    <th className="boxscore-stats">{boxscore.pf}</th>
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
                <th>Team</th>
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
                    <th>{boxscore.team.abbreviation}</th>
                    <th className="boxscore-stats">{boxscore.min}</th>
                    <th className="boxscore-stats">{boxscore.pts}</th>
                    <th className="boxscore-stats">{boxscore.fgm}</th>
                    <th className="boxscore-stats">{boxscore.fg3m}</th>
                    <th className="boxscore-stats">{boxscore.ftm}</th>
                    <th className="boxscore-stats">{boxscore.oreb}</th>
                    <th className="boxscore-stats">{boxscore.dreb}</th>
                    <th className="boxscore-stats">{boxscore.reb}</th>
                    <th className="boxscore-stats">{boxscore.ast}</th>
                    <th className="boxscore-stats">{boxscore.stl}</th>
                    <th className="boxscore-stats">{boxscore.blk}</th>
                    <th className="boxscore-stats">{boxscore.turnover}</th>
                    <th className="boxscore-stats">{boxscore.pf}</th>
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
