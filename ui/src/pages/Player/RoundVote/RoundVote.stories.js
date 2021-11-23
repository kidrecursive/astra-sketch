import React from "react";
import RoundVote from "./RoundVote";

export default {
  title: "Components/RoundVote",
  component: RoundVote,
};

const Template = (args) => <RoundVote {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
