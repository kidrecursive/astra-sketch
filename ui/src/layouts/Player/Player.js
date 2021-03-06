import React from "react";
import { useSelector } from "react-redux";
import constants from "../../constants";
import {
  selectPage,
  selectPlayer,
  selectId,
  selectRequestDuration,
} from "../../store/gameSlice";
import AddPlayers from "../../pages/Player/AddPlayer";
import SketchInput from "../../pages/Player/SketchInput";
import RoundInput from "../../pages/Player/RoundInput";
import RoundVote from "../../pages/Player/RoundVote";
import Waiting from "../../pages/Player/Waiting";
import Final from "../../pages/Player/Final";
import { useGamePollingInterval } from "../../hooks";
import TitleBar from "../../components/TitleBar";
import { Grid } from "@mui/material";

const getPage = (page) => {
  switch (page) {
    case constants.ADDING_PLAYERS_PAGE:
      return <AddPlayers />;
    case constants.TUTORIAL_PAGE:
      return <React.Fragment />;
    case constants.SKETCH_INPUT_PAGE:
      return <SketchInput />;
    case constants.ROUND_INPUT_PAGE:
      return <RoundInput />;
    case constants.ROUND_VOTE_PAGE:
      return <RoundVote />;
    case constants.FINAL_PAGE:
      return <Final />;
    default:
      return <Waiting />;
  }
};

const Player = () => {
  const page = useSelector(selectPage);
  const player = useSelector(selectPlayer);
  const gameId = useSelector(selectId);
  const requestDuration = useSelector(selectRequestDuration);
  useGamePollingInterval();

  return (
    <Grid container sx={{ justifyContent: "center" }}>
      <Grid container sx={{ flexDirection: "column", maxWidth: "320px" }}>
        <TitleBar
          player={player}
          gameId={gameId}
          requestDuration={requestDuration}
        />
        <Grid container sx={{ flexGrow: 1, alignItems: "center" }}>
          <Grid item>{getPage(page)}</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Player.propTypes = {};

Player.defaultProps = {};

export default Player;
