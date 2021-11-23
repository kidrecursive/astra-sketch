import React from "react";
import { Grid, Typography } from "@mui/material";

const Waiting = () => {
  return (
    <Grid item xs={12}>
      <Typography paragraph variant="caption" sx={{ textAlign: "center" }}>
        Hang tight!
      </Typography>
    </Grid>
  );
};

Waiting.propTypes = {};

Waiting.defaultProps = {};

export default Waiting;
