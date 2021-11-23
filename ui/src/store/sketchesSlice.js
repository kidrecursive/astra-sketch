import { createSlice } from "@reduxjs/toolkit";
import constants from "../constants";
import { generateShortId } from "../utils";
import { addAnswer } from "./answersSlice";
import _ from "lodash";

// id, round, svg, prompt, player
export const initialState = {};

export const slice = createSlice({
  name: "sketches",
  initialState,
  reducers: {
    setAll: (state, action) => {
      return action.payload;
    },
    add: (state, action) => {
      state[action.payload.id] = action.payload;
    },
    reset: () => {
      return initialState;
    },
  },
});

export const initializeSketches = () => {
  return (dispatch, getState) => {
    const { players } = getState();
    const playerNames = _.keys(players);
    constants.ROUNDS.forEach((round) => {
      const roundSketches = _.sampleSize(round.prompts, playerNames.length).map(
        (prompt, index) => {
          const sketch = {
            id: generateShortId(),
            round: round.id,
            player: playerNames[index],
            svg: null,
            answered: false,
            prompt,
          };
          dispatch(slice.actions.add(sketch));
          return sketch;
        }
      );

      roundSketches.forEach((sketch) => {
        playerNames.forEach((player) => {
          dispatch(
            addAnswer({
              id: generateShortId(),
              sketch: sketch.id,
              player: player,
              content: player === sketch.player ? sketch.prompt : null,
            })
          );
        });
      });
    });
  };
};

export const selectSketches = (state) => state.sketches;

export default slice.reducer;
