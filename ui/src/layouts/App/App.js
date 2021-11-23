import React from "react";
import Loading from "../../components/Loading";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectInitialized } from "../../store/appSlice";
import LobbyLayout from "../Lobby";
import PlayerLayout from "../Player";
import NewGame from "../../pages/Lobby/NewGame";
import JoinGame from "../../pages/Player/JoinGame";

const App = () => {
  const initialized = useSelector(selectInitialized);
  // handle app initialization
  if (!initialized) {
    return <Loading />;
  }

  return (
    <div className="app-root">
      <Routes>
        <Route path="/" element={<JoinGame />} />
        <Route path="/player/:gameid" element={<PlayerLayout />} />
        <Route path="/lobby" element={<NewGame />} />
        <Route path="/lobby/:gameId" element={<LobbyLayout />} />
      </Routes>
    </div>
  );
};

App.propTypes = {};

App.defaultProps = {};

export default App;
