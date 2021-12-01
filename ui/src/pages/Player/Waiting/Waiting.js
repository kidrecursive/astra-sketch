import React from "react";
import { Grid, Typography } from "@mui/material";

const Waiting = () => {
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Typography paragraph variant="caption" sx={{ textAlign: "center" }}>
          Hang tight! View some player art while you wait...
        </Typography>
      </Grid>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <img
          alt="random!"
          src="http://localhost:3000/svg/random.svg"
          style={{ maxWidth: "100%", maxHeight: 400, border: '2px solid black'}}
        />
      </Grid>
    </React.Fragment>
  );
};

Waiting.propTypes = {};

Waiting.defaultProps = {};

export default Waiting;
