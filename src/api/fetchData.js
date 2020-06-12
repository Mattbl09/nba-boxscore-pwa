import axios from "axios";

//const gamesURL = `https://www.balldontlie.io/api/v1/games/?dates[]=`;

export const fetchGames = async (date) => {
  const { data } = await axios.get("https://www.balldontlie.io/api/v1/games/", {
    params: {
      dates: [date],
    },
  });

  //console.log("date -->", date);

  return data;
};

export const fetchBoxscore = async (gameID) => {
  const { data } = await axios.get("https://www.balldontlie.io/api/v1/stats/", {
    params: {
      game_ids: [gameID],
    },
  });

  console.log(gameID, "<--- gameID");

  return data;
};
