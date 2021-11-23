import React from "react";
import RoundScore from "./RoundScore";

export default {
  title: "Components/RoundScore",
  component: RoundScore,
};

const Template = (args) => <RoundScore {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
