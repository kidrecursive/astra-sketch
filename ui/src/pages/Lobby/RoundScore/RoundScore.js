import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateGame } from "../../../api";
import { selectPlayers } from "../../../store/playersSlice";
import { selectAnswers } from "../../../store/answersSlice";
import { selectSketches } from "../../../store/sketchesSlice";
import { selectVotes } from "../../../store/votesSlice";
import PlayerList from "../../../components/PlayerList";
import { Grid } from "@mui/material";
import _ from "lodash";
import constants from "../../../constants";
import {
  selectId,
  selectRound,
  selectAudienceSize,
} from "../../../store/gameSlice";

const RoundScore = () => {
  const navigate = useNavigate();
  const players = useSelector(selectPlayers);
  const gameId = useSelector(selectId);
  const roundId = useSelector(selectRound);
  const currentRound = constants.ROUNDS.find((round) => round.id === roundId);
  const audienceSize = useSelector(selectAudienceSize);
  const answers = useSelector(selectAnswers);
  const sketches = useSelector(selectSketches);
  const votes = useSelector(selectVotes);

  const updateScore = () => {
    const roundSketches = _.pickBy(
      sketches,
      (sketch) => sketch.round === roundId
    );
    const roundAnswers = _.pickBy(answers, (answer) =>
      _.keys(roundSketches).includes(answer.sketch)
    );
    const roundVotes = _.pickBy(votes, (vote) =>
      _.keys(roundAnswers).includes(vote.answer)
    );
    const currentRoundId = currentRound ? currentRound.id : 0;
    const nextRound = currentRoundId + 1;
    const newPlayers = _.cloneDeep(players);
    _.keys(roundVotes).forEach((voteId) => {
      const player = roundAnswers[roundVotes[voteId].answer].player;
      newPlayers[player] = {
        score:
          constants.BASE_POINTS * currentRound.scoreMultiplier +
          parseInt(newPlayers[player].score),
      };
    });
    updateGame(`${gameId}/players`, newPlayers);
    setTimeout(() => {
      let next = { page: constants.FINAL_PAGE, round: "" };
      if (nextRound <= constants.ROUNDS.length) {
        next = { page: constants.SKETCH_INPUT_PAGE, round: nextRound };
      }
      updateGame(`${gameId}/game`, next);
      if (next.page === constants.FINAL_PAGE) {
        navigate("/lobby");
      }
    }, constants.ROUND_SCORE_TIMER);
  };

  React.useEffect(
    updateScore,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <PlayerList
        players={players}
        audienceSize={audienceSize}
        showScore={true}
      />
    </Grid>
  );
};

RoundScore.propTypes = {};

RoundScore.defaultProps = {};

export default RoundScore;
