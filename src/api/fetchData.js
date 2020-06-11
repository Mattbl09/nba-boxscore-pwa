import axios from "axios";

//const gamesURL = `https://www.balldontlie.io/api/v1/games/?dates[]=`;

export const fetchGames = async (date) => {
  const { data } = await axios.get("https://www.balldontlie.io/api/v1/games/", {
    params: {
      dates: [date],
    },
  });

  return data;
};

export const fetchBoxscore = async (gameID) => {
  const { data } = await axios.get("https://www.balldontlie.io/api/v1/stats/", {
    params: {
      game_ids: gameID,
    },
  });

  return data;
};
