import React from "react";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { selectSketches } from "../../../store/sketchesSlice";
import { selectRound, selectPlayer, selectId } from "../../../store/gameSlice";
import { updateGame } from "../../../api";
import SketchSurface from "../../../components/SketchSurface";
import Waiting from "../Waiting";
import _ from "lodash";

const SketchInput = () => {
  const sketches = useSelector(selectSketches);
  const roundId = useSelector(selectRound);
  const player = useSelector(selectPlayer);
  const gameId = useSelector(selectId);
  const playerSketchPick = _.pickBy(sketches, (sketch) => {
    return sketch.player === player && sketch.round === roundId;
  });
  const playerSketch = sketches[_.keys(playerSketchPick)[0]];
  const [svg, setSvg] = React.useState("");
  const [responseSent, setResponseSent] = React.useState(false);

  const getSvg = async (svgData) => {
    setSvg(svgData);
    setResponseSent(true);
    await updateGame(`${gameId}/sketches`, {
      [playerSketch.id]: {
        ...playerSketch,
        svg: svgData,
      },
    });
  };

  if (responseSent) {
    return <Waiting />;
  }

  return (
    <React.Fragment>
      <Typography paragraph style={{ marginTop: 32 }}>
        Your Prompt: {playerSketch.prompt}
      </Typography>
      <SketchSurface sendSvg={getSvg} />
    </React.Fragment>
  );
};

SketchInput.propTypes = {};

SketchInput.defaultProps = {};

export default SketchInput;
