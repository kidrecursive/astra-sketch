import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Waiting from "./Waiting";

describe("Waiting", () => {
  it("renders without crashing", () => {
    render(<Waiting />);
  });
});
