import React from "react";
import AddPlayers from "./AddPlayers";

export default {
  title: "Components/AddPlayers",
  component: AddPlayers,
};

const Template = (args) => <AddPlayers {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
