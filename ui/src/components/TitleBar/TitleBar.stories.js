import React from "react";
import TitleBar from "./TitleBar";

export default {
  title: "Components/TitleBar",
  component: TitleBar,
};

const Template = (args) => <TitleBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  gameId: "ABCD",
  player: "CRW",
  playerCount: 3,
};
