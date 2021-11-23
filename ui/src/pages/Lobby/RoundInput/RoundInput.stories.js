import React from "react";
import RoundInput from "./RoundInput";

export default {
  title: "Components/RoundInput",
  component: RoundInput,
};

const Template = (args) => <RoundInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
