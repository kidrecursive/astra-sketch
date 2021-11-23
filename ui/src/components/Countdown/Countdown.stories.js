import React from "react";
import Countdown from "./Countdown";

export default {
  title: "Components/Countdown",
  component: Countdown,
};

const Template = (args) => <Countdown {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
