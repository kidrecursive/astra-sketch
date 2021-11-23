import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import JoinGame from "./JoinGame";

describe("JoinGame", () => {
  it("renders without crashing", () => {
    render(<JoinGame />);
  });
});
