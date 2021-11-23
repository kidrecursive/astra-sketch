import React from "react";
import { useSelector } from "react-redux";
import { selectPlayers } from "../../../store/playersSlice";
import PlayerList from "../../../components/PlayerList";
import { Grid, Typography } from "@mui/material";
import { selectId, selectAudienceSize } from "../../../store/gameSlice";

const AddPlayers = () => {
  const players = useSelector(selectPlayers);
  const gameId = useSelector(selectId);
  const audienceSize = useSelector(selectAudienceSize);

  return (
    <Grid
      container
      sx={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid item>
        <Typography color="textSecondary">welcome to</Typography>
        <Typography variant="h4" sx={{ marginBottom: 8 }}>
          Astra Draw
        </Typography>
        <Typography color="textSecondary">game code</Typography>
        <Typography variant="h1" className="highlight">
          {gameId}
        </Typography>
      </Grid>
      <PlayerList players={players} audienceSize={audienceSize} />
    </Grid>
  );
};

AddPlayers.propTypes = {};

AddPlayers.defaultProps = {};

export default AddPlayers;
