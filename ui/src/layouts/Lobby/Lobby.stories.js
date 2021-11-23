import React from "react";
import Lobby from "./Lobby";

export default {
  title: "Components/Lobby",
  component: Lobby,
};

const Template = (args) => <Lobby {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
