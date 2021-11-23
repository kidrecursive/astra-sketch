import React from "react";
import constants from "../../../constants";
import { updateGame } from "../../../api";
import { getSvgSrc } from "../../../utils";
import { useSelector } from "react-redux";
import { selectAnswers } from "../../../store/answersSlice";
import { selectSketches } from "../../../store/sketchesSlice";
import { selectVotes } from "../../../store/votesSlice";
import { selectPlayers } from "../../../store/playersSlice";
import { useTheme } from "@mui/material/styles";
import _ from "lodash";
import { selectId, selectRound, selectSketch } from "../../../store/gameSlice";
import {
  Divider,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

const countVotes = (votes, answerId) => {
  const answerVotes = _.pickBy(votes, (vote) => vote.answer === answerId);
  return _.isEmpty(answerVotes) ? 0 : _.keys(answerVotes).length;
};

const RoundVote = () => {
  const gameId = useSelector(selectId);
  const roundId = useSelector(selectRound);
  const currentSketchId = useSelector(selectSketch);
  const currentRound = constants.ROUNDS.find((round) => round.id === roundId);
  const answers = useSelector(selectAnswers);
  const players = useSelector(selectPlayers);
  const sketches = useSelector(selectSketches);
  const votes = useSelector(selectVotes);
  const theme = useTheme();
  const remainingSketchIds = _.keys(
    _.pickBy(sketches, (sketch) => sketch.round === roundId && !sketch.answered)
  );

  React.useEffect(() => {
    const sketchAnswers = _.pickBy(
      answers,
      (answer) => answer.sketch === currentSketchId
    );
    const answerVotes = _.pickBy(votes, (vote) =>
      _.keys(sketchAnswers).includes(vote.answer)
    );
    if (_.keys(players).length - 1 <= _.keys(answerVotes).length) {
      console.log(`voting complete for ${currentSketchId}`);

      if (remainingSketchIds.length === 0) {
        console.log(`round complete: ${roundId}`);
        updateGame(`${gameId}/game`, {
          page: constants.ROUND_SCORE_PAGE,
          sketch: "",
        });
      } else {
        updateGame(`${gameId}/game`, {
          page: constants.ROUND_INPUT_PAGE,
          sketch: remainingSketchIds[0],
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [votes]);

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={4}
    >
      <Grid item xs={12}>
        <Typography color="textSecondary" paragraph>
          {currentRound && currentRound.title}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <img
          width="320"
          height="320"
          alt="Astra Draw"
          src={getSvgSrc(sketches[currentSketchId].svg)}
        />
      </Grid>
      <Grid item xs={6}>
        <List>
          <ListItem>
            <ListItemText secondary="votes&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;answer" />
          </ListItem>
          {_.keys(
            _.pickBy(answers, (answer) => answer.sketch === currentSketchId)
          ).map((answerId) => (
            <ListItem key={answerId}>
              <ListItemAvatar>
                <Avatar
                  variant="square"
                  style={{ backgroundColor: theme.palette.primary.main }}
                >
                  {countVotes(votes, answerId)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="h5">
                    {answers[answerId].content}
                  </Typography>
                }
              />
              <Divider />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

RoundVote.propTypes = {};

RoundVote.defaultProps = {};

export default RoundVote;
