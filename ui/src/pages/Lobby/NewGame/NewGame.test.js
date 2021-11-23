import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import NewGame from "./NewGame";

describe("NewGame", () => {
  it("renders without crashing", () => {
    render(<NewGame />);
  });
});
