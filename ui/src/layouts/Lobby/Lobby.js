import React from "react";
import { useSelector } from "react-redux";
import constants from "../../constants";
import { Grid } from "@mui/material";
import AddPlayers from "../../pages/Lobby/AddPlayers";
import Tutorial from "../../pages/Lobby/Tutorial";
import RoundInput from "../../pages/Lobby/RoundInput";
import RoundVote from "../../pages/Lobby/RoundVote";
import RoundScore from "../../pages/Lobby/RoundScore";
import { selectPage, selectId } from "../../store/gameSlice";
import { selectPlayers } from "../../store/playersSlice";
import { useGamePollingInterval } from "../../hooks";
import TitleBar from "../../components/TitleBar";
import _ from "lodash";

const getPage = (page) => {
  switch (page) {
    case constants.ADDING_PLAYERS_PAGE:
      return <AddPlayers />;
    case constants.TUTORIAL_PAGE:
      return <Tutorial />;
    case constants.ROUND_INPUT_PAGE:
      return <RoundInput />;
    case constants.ROUND_VOTE_PAGE:
      return <RoundVote />;
    case constants.ROUND_SCORE_PAGE:
      return <RoundScore />;
    default:
      return <React.Fragment />;
  }
};

const Lobby = () => {
  const page = useSelector(selectPage);
  const gameId = useSelector(selectId);
  const players = useSelector(selectPlayers);
  useGamePollingInterval();

  return (
    <Grid container sx={{ justifyContent: "center" }}>
      <Grid container sx={{ flexDirection: "column", maxWidth: "1024px" }}>
        <TitleBar gameId={gameId} playerCount={_.keys(players).length} />
        <Grid container sx={{ flexGrow: 1, alignItems: "center" }}>
          {getPage(page)}
        </Grid>
      </Grid>
    </Grid>
  );
};

Lobby.propTypes = {};

Lobby.defaultProps = {};

export default Lobby;
