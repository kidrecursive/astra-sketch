import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import RoundVote from "./RoundVote";

describe("RoundVote", () => {
  it("renders without crashing", () => {
    render(<RoundVote />);
  });
});
