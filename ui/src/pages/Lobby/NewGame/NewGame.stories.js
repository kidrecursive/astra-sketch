import React from "react";
import NewGame from "./NewGame";

export default {
  title: "Components/NewGame",
  component: NewGame,
};

const Template = (args) => <NewGame {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
