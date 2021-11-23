import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Lobby from "./Lobby";

describe("Lobby", () => {
  it("renders without crashing", () => {
    render(<Lobby />);
  });
});
