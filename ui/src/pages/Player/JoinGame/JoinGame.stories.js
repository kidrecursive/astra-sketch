import React from "react";
import JoinGame from "./JoinGame";

export default {
  title: "Components/JoinGame",
  component: JoinGame,
};

const Template = (args) => <JoinGame {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
