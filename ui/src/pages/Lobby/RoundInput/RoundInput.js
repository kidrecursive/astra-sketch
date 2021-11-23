import React from "react";
import constants from "../../../constants";
import { updateGame } from "../../../api";
import { getSvgSrc } from "../../../utils";
import { useSelector } from "react-redux";
import { Grid, Typography } from "@mui/material";
import { selectId, selectRound, selectSketch } from "../../../store/gameSlice";
import { selectAnswers } from "../../../store/answersSlice";
import { selectSketches } from "../../../store/sketchesSlice";
import Countdown from "../../../components/Countdown";
import _ from "lodash";

const RoundInput = () => {
  const gameId = useSelector(selectId);
  const roundId = useSelector(selectRound);
  const answers = useSelector(selectAnswers);
  const sketches = useSelector(selectSketches);
  const sketch = useSelector(selectSketch);
  const [shouldTransition, setShouldTransition] = React.useState(false);

  // React.useEffect(() => {
  //   const expiredTimeout = setTimeout(() => {
  //     setShouldTransition(true);
  //   }, constants.ROUND_INPUT_TIMER);
  //   return () => clearTimeout(expiredTimeout);
  // }, []);

  React.useEffect(() => {
    const roundAnswers = _.pickBy(answers, (answer, answerId) => {
      return answers[answerId].sketch === sketch;
    });
    let transition = true;
    _.keys(roundAnswers).forEach((roundAnswerId) => {
      if (!roundAnswers[roundAnswerId].content) {
        transition = false;
      }
    });
    setShouldTransition(transition);
  }, [answers, sketches, roundId, gameId]);

  React.useEffect(async () => {
    if (shouldTransition) {
      await updateGame(`${gameId}/sketches`, {
        [sketch]: {
          ...sketches[sketch],
          answered: true,
        },
      });
      await updateGame(`${gameId}/game`, {
        page: constants.ROUND_VOTE_PAGE,
      });
    }
  }, [gameId, shouldTransition, sketches, roundId]);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item xs={6}>
        <Typography paragraph>What is this thing?</Typography>
      </Grid>
      <Grid item xs={12}>
        <img alt="Astra Draw" src={getSvgSrc(sketches[sketch].svg)} />
      </Grid>
      <Grid item xs={12}>
        <Countdown duration={constants.ROUND_INPUT_TIMER} />
      </Grid>
    </Grid>
  );
};

RoundInput.propTypes = {};

RoundInput.defaultProps = {};

export default RoundInput;
