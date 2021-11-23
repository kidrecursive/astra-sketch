import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import SketchInput from "./SketchInput";

describe("SketchInput", () => {
  it("renders without crashing", () => {
    render(<SketchInput />);
  });
});
