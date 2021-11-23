import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { updateGame } from "../../../api";
import { selectId, selectPlayer } from "../../../store/gameSlice";
import { selectPlayers } from "../../../store/playersSlice";
import Waiting from "../Waiting";
import constants from "../../../constants";

const AddPlayer = () => {
  const [startingGame, setStartingGame] = React.useState(false);
  const gameId = useSelector(selectId);
  const player = useSelector(selectPlayer);
  const players = useSelector(selectPlayers);
  const startGame = async () => {
    setStartingGame(true);
    await updateGame(`${gameId}/game`, { page: constants.TUTORIAL_PAGE });
  };

  if (players && players[player] && players[player].vip) {
    return (
      <React.Fragment>
        <Typography paragraph variant="caption">
          Congrats, you're VIP!
        </Typography>
        <Button
          fullWidth
          disableElevation
          disabled={startingGame}
          onClick={startGame}
          size="large"
          variant="contained"
          color="primary"
        >
          start game
        </Button>
      </React.Fragment>
    );
  }
  return <Waiting />;
};

AddPlayer.propTypes = {};

AddPlayer.defaultProps = {};

export default AddPlayer;
