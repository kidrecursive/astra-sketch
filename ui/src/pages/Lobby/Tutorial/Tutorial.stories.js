import React from "react";
import Tutorial from "./Tutorial";

export default {
  title: "Components/Tutorial",
  component: Tutorial,
};

const Template = (args) => <Tutorial {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
