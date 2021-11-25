import React from "react";
import { useSelector } from "react-redux";
import { Button, Grid } from "@mui/material";
import { getSvgSrc } from "../../../utils";
import { selectAnswers } from "../../../store/answersSlice";
import { selectSketches } from "../../../store/sketchesSlice";
import { selectPlayer, selectId, selectSketch } from "../../../store/gameSlice";
import { upsertVote } from "../../../api";
import Waiting from "../Waiting";
import _ from "lodash";

const RoundVote = () => {
  const gameId = useSelector(selectId);
  const player = useSelector(selectPlayer);
  const sketch = useSelector(selectSketch);
  const sketches = useSelector(selectSketches);
  const answers = useSelector(selectAnswers);
  const sketchAnswers = _.pickBy(
    answers,
    (answer) => answer.sketch === sketch && answer.player !== player
  );
  const [voted, setVoted] = React.useState(false);

  const sendVote = (answerId) => {
    upsertVote(gameId, {
      player,
      answer: answerId,
    });
    setVoted(true);
  };

  if (voted || sketches[sketch].player === player) {
    return <Waiting />;
  }

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <img
          width="320"
          height="320"
          alt="Astra Draw"
          src={getSvgSrc(sketches[sketch].svg)}
        />
      </Grid>
      <Grid item xs={12}>
        {_.keys(sketchAnswers).map((answerId) => (
          <Button
            key={answerId}
            style={{ marginTop: 16 }}
            fullWidth
            disableElevation
            disabled={voted}
            size="large"
            variant="contained"
            color="primary"
            onClick={() => sendVote(answerId)}
          >
            {answers[answerId].content}
          </Button>
        ))}
      </Grid>
    </React.Fragment>
  );
};

RoundVote.propTypes = {};

RoundVote.defaultProps = {};

export default RoundVote;
