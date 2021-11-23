import React from "react";
import SketchInput from "./SketchInput";

export default {
  title: "Components/SketchInput",
  component: SketchInput,
};

const Template = (args) => <SketchInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
