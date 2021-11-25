import React, { useState } from "react";
import { upsertPlayer } from "../../../api";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, TextField, Grid, Box, Typography } from "@mui/material";
import {
  selectId,
  selectPlayer,
  setPlayer,
  setId,
} from "../../../store/gameSlice";

const JoinGame = () => {
  const dispatch = useDispatch();
  const gameId = useSelector(selectId);
  const player = useSelector(selectPlayer);
  const navigate = useNavigate();
  const [newPlayer, setNewPlayer] = useState(player);
  const [newGameId, setNewGameId] = useState(gameId);

  const joinGame = async (e) => {
    const newGameIdUpper = newGameId.toUpperCase();
    await upsertPlayer(newGameIdUpper, {name: newPlayer});
    dispatch(setPlayer(newPlayer));
    dispatch(setId(newGameIdUpper));
    navigate(`/player/${newGameIdUpper}`);
  };

  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
      }}
    >
      <Grid
        container
        sx={{
          width: 320,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Grid item sx={{ width: "300px", mb: 2 }}>
          <Typography color="textSecondary">welcome to</Typography>
          <Typography variant="h5" paragraph>
            Astra Draw
          </Typography>
        </Grid>

        <TextField
          sx={{ mb: 2 }}
          label="name"
          variant="outlined"
          fullWidth
          onChange={(e) => setNewPlayer(e.target.value)}
          value={newPlayer}
        />
        <TextField
          sx={{ mb: 2 }}
          inputProps={{
            style: { textTransform: "uppercase", fontFamily: "Special Elite" },
          }}
          label="game code"
          variant="outlined"
          fullWidth
          value={newGameId}
          onChange={(e) => setNewGameId(e.target.value)}
        />
        <Button
          fullWidth
          disableElevation
          onClick={joinGame}
          size="large"
          variant="contained"
          color="primary"
        >
          join game
        </Button>
      </Grid>
    </Grid>
  );
};

JoinGame.propTypes = {};

JoinGame.defaultProps = {};

export default JoinGame;
