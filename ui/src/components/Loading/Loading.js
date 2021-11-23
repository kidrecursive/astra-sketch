import React from "react";
import { Grid, LinearProgress } from "@mui/material";

const Loading = () => {
  return (
    <Grid
      container
      className="loading-root"
      sx={{
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div style={{ width: 64 }}>
        <LinearProgress />
      </div>
    </Grid>
  );
};

Loading.propTypes = {};

Loading.defaultProps = {};

export default Loading;
