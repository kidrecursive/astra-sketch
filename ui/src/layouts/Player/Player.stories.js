import React from "react";
import Player from "./Player";

export default {
  title: "Components/Player",
  component: Player,
};

const Template = (args) => <Player {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
