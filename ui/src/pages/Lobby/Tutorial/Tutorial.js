import React from "react";
import constants from "../../../constants";
import { updateGame } from "../../../api";
import { useSelector, useDispatch, useStore } from "react-redux";
import { Grid, Typography } from "@mui/material";
import { selectId } from "../../../store/gameSlice";
import { initializeSketches } from "../../../store/sketchesSlice";
import Countdown from "../../../components/Countdown";

const Tutorial = () => {
  const dispatch = useDispatch();
  const gameId = useSelector(selectId);
  const store = useStore();

  React.useEffect(() => {
    const setSketches = async () => {
      dispatch(initializeSketches());
      const { sketches, answers } = store.getState();
      await updateGame(gameId, {
        sketches,
        answers,
      });
    };
    setSketches();
    setTimeout(async () => {
      await updateGame(`${gameId}/game`, {
        page: constants.SKETCH_INPUT_PAGE,
        round: constants.ROUNDS[0].id,
      });
    }, constants.TUTORIAL_LENGTH);
  }, [gameId, dispatch, store]);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h6" paragraph>
          Listen, this is easy, just draw fast!
        </Typography>
        <Typography variant="h6" style={{ marginBottom: 64 }}>
          Then, vote for the correct drawing prompt.
        </Typography>
      </Grid>

      <Countdown duration={constants.TUTORIAL_LENGTH} />
    </Grid>
  );
};

Tutorial.propTypes = {};

Tutorial.defaultProps = {};

export default Tutorial;
