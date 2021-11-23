import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetGame } from "../../../store/gameSlice";

const Final = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(resetGame());
    navigate(`/`);
  }, [dispatch, navigate]);
  return <React.Fragment />;
};

Final.propTypes = {};

Final.defaultProps = {};

export default Final;
