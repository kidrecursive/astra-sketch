import { configureStore, combineReducers } from "@reduxjs/toolkit";
import persistState from "redux-localstorage";
import appReducer from "./appSlice";
import gameReducer from "./gameSlice";
import playersReducer from "./playersSlice";
import sketchesReducer from "./sketchesSlice";
import answersReducer from "./answersSlice";
import votesReducer from "./votesSlice";

export const reducers = combineReducers({
  app: appReducer,
  game: gameReducer,
  players: playersReducer,
  sketches: sketchesReducer,
  answers: answersReducer,
  votes: votesReducer,
});

export default configureStore({
  reducer: reducers,
  enhancers: [persistState()],
});
