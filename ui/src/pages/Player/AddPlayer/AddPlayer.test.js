import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import AddPlayer from "./AddPlayer";

describe("AddPlayer", () => {
  it("renders without crashing", () => {
    render(<AddPlayer />);
  });
});
