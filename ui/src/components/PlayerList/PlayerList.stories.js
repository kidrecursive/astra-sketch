import React from "react";
import PlayerList from "./PlayerList";

export default {
  title: "Components/PlayerList",
  component: PlayerList,
};

const Template = (args) => <PlayerList {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
