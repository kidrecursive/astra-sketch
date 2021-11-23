import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Countdown from "./Countdown";

describe("Countdown", () => {
  it("renders without crashing", () => {
    render(<Countdown />);
  });
});
