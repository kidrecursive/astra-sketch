import React from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import {
  selectId,
  setPage,
  setRound,
  setSketch,
  setRequestDuration,
} from "./store/gameSlice";
import { addPlayer } from "./store/playersSlice";
import { slice as sketchesSlice } from "./store/sketchesSlice";
import { slice as answersSlice } from "./store/answersSlice";
import { slice as votesSlice } from "./store/votesSlice";
import _ from "lodash";

const gameMapping = {
  answers: answersSlice,
  sketches: sketchesSlice,
  votes: votesSlice,
};

export const useGamePollingInterval = () => {
  const gameId = useSelector(selectId);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!gameId) {
      return;
    }

    // TODO: Figure out how to make SSE work with the npm built-in proxy
    const eventSource = new EventSource(`/stream/${gameId}`);
    eventSource.onmessage = (event) => {
      const gameData = JSON.parse(event.data);

      batch(() => {
        if (gameData.players) {
          _.keys(gameData.players).forEach((playerId) => {
            dispatch(addPlayer(playerId, gameData.players[playerId].score));
          });
        }
        if (gameData.game && gameData.game.round) {
          dispatch(setRound(gameData.game.round));
        }
        if (gameData.game && gameData.game.page) {
          dispatch(setPage(gameData.game.page));
        }
        if (gameData.game && gameData.game.sketch) {
          dispatch(setSketch(gameData.game.sketch));
        }
        if (gameData.game && gameData.game.requestDuration) {
          dispatch(setRequestDuration(gameData.game.requestDuration));
        }
        _.keys(gameMapping).forEach((gameKey) => {
          if (gameData[gameKey]) {
            dispatch(gameMapping[gameKey].actions.setAll(gameData[gameKey]));
          }
        });
      });
    }

    eventSource.onerror = (err) => {
      console.log("error happend during stream update " + err);
      eventSource.close();
    }

    return () => {
      eventSource.close();
    };
  }, [gameId, dispatch]);

  return null;
};
