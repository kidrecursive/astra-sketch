import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import RoundInput from "./RoundInput";

describe("RoundInput", () => {
  it("renders without crashing", () => {
    render(<RoundInput />);
  });
});
