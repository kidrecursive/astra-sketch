import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Player from "./Player";

describe("Player", () => {
  it("renders without crashing", () => {
    render(<Player />);
  });
});
