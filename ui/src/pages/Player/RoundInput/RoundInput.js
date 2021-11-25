import React from "react";
import { useSelector } from "react-redux";
import { Button, TextField, Typography } from "@mui/material";
import { selectAnswers } from "../../../store/answersSlice";
import { selectPlayer, selectId, selectSketch } from "../../../store/gameSlice";
import { selectSketches } from "../../../store/sketchesSlice";
import { upsertAnswer } from "../../../api";
import Waiting from "../Waiting";
import _ from "lodash";

const RoundInput = () => {
  const sketches = useSelector(selectSketches);
  const sketch = useSelector(selectSketch);
  const answers = useSelector(selectAnswers);
  const player = useSelector(selectPlayer);
  const gameId = useSelector(selectId);
  const playerAnswerPick = _.pickBy(answers, (answer) => {
    return answer.player === player && answer.sketch === sketch;
  });
  const playerAnswer = playerAnswerPick[_.keys(playerAnswerPick)[0]];
  const [response, setResponse] = React.useState("");
  const [responseSent, setResponseSent] = React.useState(false);

  const submitResponse = async () => {
    setResponseSent(true);
    await upsertAnswer(gameId, {
        ...playerAnswer,
        content: response,
    });
  };

  if (responseSent || sketches[sketch].player === player) {
    return <Waiting />;
  }

  return (
    <React.Fragment>
      <Typography paragraph style={{ marginTop: 32 }}>
        What is this thing?
      </Typography>
      <TextField
        label="response"
        variant="outlined"
        value={response || ""}
        onChange={(e) => setResponse(e.target.value)}
      />
      <Button
        style={{ marginTop: 32 }}
        fullWidth
        disableElevation
        size="large"
        disabled={!response}
        variant="contained"
        color="primary"
        onClick={submitResponse}
      >
        submit
      </Button>
    </React.Fragment>
  );
};

RoundInput.propTypes = {};

RoundInput.defaultProps = {};

export default RoundInput;
