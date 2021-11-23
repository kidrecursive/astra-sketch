import React from "react";
import { Divider, Grid, Typography } from "@mui/material";

const TitleBar = ({ gameId, player, playerCount }) => {
  return (
    <React.Fragment>
      <Grid container sx={{ padding: 1, alignItems: "center" }}>
        <Grid item sx={{ flexGrow: 1 }}>
          <Typography className="small-highlight">{gameId}</Typography>
        </Grid>
        <Grid item sx={{ flexShrink: 0, marginTop: 0.5 }}>
          {player && <Typography>{player}</Typography>}
          {playerCount !== 0 && <Typography>{playerCount} players</Typography>}
        </Grid>
      </Grid>
      <Divider />
      <Grid container sx={{ padding: 1 }} alignItems="center">
        <Grid item sx={{ flexGrow: 1 }}>
          <Typography
            size="small"
            variant="caption"
            color="textSecondary"
            style={{ padding: 8 }}
          >
            Astra Draw
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

TitleBar.propTypes = {};

TitleBar.defaultProps = {};

export default TitleBar;
