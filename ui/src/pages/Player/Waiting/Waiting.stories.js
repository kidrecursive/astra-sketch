import React from "react";
import Waiting from "./Waiting";

export default {
  title: "Components/Waiting",
  component: Waiting,
};

const Template = (args) => <Waiting {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
