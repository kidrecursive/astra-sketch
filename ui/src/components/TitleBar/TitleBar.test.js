import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import TitleBar from "./TitleBar";

describe("TitleBar", () => {
  it("renders without crashing", () => {
    render(<TitleBar />);
  });
});
