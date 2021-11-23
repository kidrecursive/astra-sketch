import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import AddPlayers from "./AddPlayers";

describe("AddPlayers", () => {
  it("renders without crashing", () => {
    render(<AddPlayers />);
  });
});
