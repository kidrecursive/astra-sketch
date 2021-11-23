import React from "react";
import Countdown from "react-countdown";
import { Typography } from "@mui/material";

const renderer = ({ minutes, seconds }) => {
  return (
    <Typography variant="h2" className="highlight">
      {minutes !== 0 && `${minutes}:`}
      {seconds}
    </Typography>
  );
};

const CountdownPage = ({ duration }) => {
  const [date] = React.useState(Date.now() + duration);
  return <Countdown date={date} renderer={renderer} />;
};

CountdownPage.propTypes = {};

CountdownPage.defaultProps = {};

export default CountdownPage;
