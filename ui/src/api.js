import store from "./store";
import _ from "lodash";

const apiPath = "/games";

export const getGame = async (path) => {
  const res = await fetch(`${apiPath}/${path}`);
  return await res.json();
};

export const createGame = async (gameId) => {
  const filteredGame = _.omit(store.getState(), ["app", "game.player"]);
  const res = await fetch(`${apiPath}/${gameId}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...filteredGame.game }),
  });
  return await res.json();
};

export const updateGame = async (gameId, update) => {
  const res = await fetch(`${apiPath}/${gameId}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: gameId, ...update }),
  });
  return await res.json();
};

export const upsertPlayer = async (gameId, playerObj) => {
  const res = await fetch(
    `${apiPath}/${gameId}/players`,
    {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(playerObj),
    }
  );
  return await res.json();
};


export const upsertSketch = async (gameId, sketchObj) => {
  const res = await fetch(
    `${apiPath}/${gameId}/sketches`,
    {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sketchObj),
    }
  );
  return await res.json();
};

export const upsertAnswer = async (gameId, answerObj) => {
  const res = await fetch(
    `${apiPath}/${gameId}/answers`,
    {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(answerObj),
    }
  );
  return await res.json();
};

export const upsertVote = async (gameId, voteObj) => {
  const res = await fetch(
    `${apiPath}/${gameId}/votes`,
    {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(voteObj),
    }
  );
  return await res.json();
};

export const getXKCD = async () => {
  const res = await fetch(`${apiPath}/getXKCD`);
  return await res.json();
};
