import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import PlayerList from "./PlayerList";

describe("PlayerList", () => {
  it("renders without crashing", () => {
    render(<PlayerList />);
  });
});
