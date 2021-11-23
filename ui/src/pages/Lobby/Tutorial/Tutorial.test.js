import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Tutorial from "./Tutorial";

describe("Tutorial", () => {
  it("renders without crashing", () => {
    render(<Tutorial />);
  });
});
