import React from "react";
import constants from "../../../constants";
import { updateGame } from "../../../api";
import { useSelector } from "react-redux";
import { Grid, Typography } from "@mui/material";
import { selectId, selectRound } from "../../../store/gameSlice";
import { selectSketches } from "../../../store/sketchesSlice";
import Countdown from "../../../components/Countdown";
import { getSvgSrc } from "../../../utils";
import _ from "lodash";

const SketchInput = () => {
  const gameId = useSelector(selectId);
  const roundId = useSelector(selectRound);
  const sketches = useSelector(selectSketches);
  const [shouldTransition, setShouldTransition] = React.useState(false);
  const roundSketchIds = _.keys(
    _.pickBy(sketches, (sketch) => sketch.round === roundId)
  );

  // React.useEffect(() => {
  //   const expiredTimeout = setTimeout(() => {
  //     setShouldTransition(true);
  //   }, constants.ROUND_INPUT_TIMER);
  //   return () => clearTimeout(expiredTimeout);
  // }, []);

  React.useEffect(() => {
    let transition = true;
    roundSketchIds.forEach((sketchId) => {
      console.log(sketches[sketchId].svg);
      if (!sketches[sketchId].svg) {
        transition = false;
      }
    });
    console.log(transition);
    setShouldTransition(transition);
  }, [sketches, roundId, gameId]);

  React.useEffect(() => {
    if (shouldTransition) {
      updateGame(`${gameId}/game`, {
        page: constants.ROUND_INPUT_PAGE,
        sketch: roundSketchIds[0],
      });
    }
  }, [gameId, shouldTransition, sketches, roundId]);

  return (
    <Grid
      container
      spacing={4}
      sx={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid item xs={12}>
        <Typography paragraph>
          A drawing prompt has been sent to your device, hurry up and draw!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Countdown duration={constants.ROUND_INPUT_TIMER} />
      </Grid>
    </Grid>
  );
};

SketchInput.propTypes = {};

SketchInput.defaultProps = {};

export default SketchInput;
