import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Final from "./Final";

describe("Final", () => {
  it("renders without crashing", () => {
    render(<Final />);
  });
});
