import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import RoundScore from "./RoundScore";

describe("RoundScore", () => {
  it("renders without crashing", () => {
    render(<RoundScore />);
  });
});
