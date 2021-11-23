import React from "react";
import { createGame } from "../../../api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { generateGameId } from "../../../utils";
import { Button, Grid, Typography } from "@mui/material";
import { selectPlayers } from "../../../store/playersSlice";
import PlayerList from "../../../components/PlayerList";
import _ from "lodash";
import {
  initialize,
  resetGame,
  selectId,
  selectAudienceSize,
} from "../../../store/gameSlice";

const NewGame = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const players = useSelector(selectPlayers);
  const gameId = useSelector(selectId);
  const audienceSize = useSelector(selectAudienceSize);

  const createAndInitGame = () => {
    const newGameId = generateGameId();
    dispatch(resetGame());
    dispatch(initialize(newGameId));
    createGame(newGameId);
    navigate(`/lobby/${newGameId}`);
  };

  return (
    <Grid container sx={{ justifyContent: "center" }}>
      <Grid container sx={{ flexDirection: "column", maxWidth: "1024px" }}>
        <Grid container sx={{ flexGrow: 1, alignItems: "center" }}>
          <Grid
            container
            sx={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item>
              {_.isEmpty(players) && (
                <Typography color="textSecondary">welcome to</Typography>
              )}
              {!_.isEmpty(players) && (
                <Typography color="textSecondary">
                  thanks for playing
                </Typography>
              )}
              <Typography variant="h4" sx={{ marginBottom: 8 }}>
                Astra Draw
              </Typography>
              <Typography color="textSecondary">game code</Typography>
              <Typography variant="h1" className="highlight">
                {gameId || "----"}
              </Typography>
              <br />
              <Button
                sx={{ marginTop: 4 }}
                disableElevation
                onClick={createAndInitGame}
                size="large"
                variant="contained"
                color="primary"
              >
                start new game
              </Button>
            </Grid>
            <PlayerList
              players={players}
              audienceSize={audienceSize}
              showScore={true}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

NewGame.propTypes = {};

NewGame.defaultProps = {};

export default NewGame;
