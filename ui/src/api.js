import store from "./store";
import _ from "lodash";

const apiPath = "/";

export const getGame = async (path) => {
  const res = await fetch(`${apiPath}/games/${path}`);
  return await res.json();
};

export const createGame = async (gameId) => {
  const filteredGame = _.omit(store.getState(), ["app", "game.player"]);
  const res = await fetch(`${apiPath}/games/${gameId}`, {
    method: "PUT",
    body: JSON.stringify({ ...filteredGame.game }),
  });
  return await res.json();
};

export const updateGame = async (gameId, update) => {
  const res = await fetch(`${apiPath}/games/${gameId}`, {
    method: "PUT",
    body: JSON.stringify({ update }),
  });
  return await res.json();
};

export const upsertPlayer = async (gameId, playerId) => {
  const res = await fetch(
    `${apiPath}/games/${gameId}/players`,
    {
      method: "PUT",
      body: JSON.stringify({ name: playerId }),
    }
  );
  return await res.json();
};


export const upsertSketch = async (gameId, sketchObj) => {
  const res = await fetch(
    `${apiPath}/games/${gameId}/sketches`,
    {
      method: "PUT",
      body: JSON.stringify(sketchObj),
    }
  );
  return await res.json();
};

export const upsertAnswer = async (gameId, answerObj) => {
  const res = await fetch(
    `${apiPath}/games/${gameId}/answers`,
    {
      method: "PUT",
      body: JSON.stringify(answerObj),
    }
  );
  return await res.json();
};

export const upsertVote = async (gameId, voteObj) => {
  const res = await fetch(
    `${apiPath}/games/${gameId}/votes`,
    {
      method: "PUT",
      body: JSON.stringify(voteObj),
    }
  );
  return await res.json();
};

export const getXKCD = async () => {
  const res = await fetch(`${apiPath}/getXKCD`);
  return await res.json();
};
