import React from "react";
import AddPlayer from "./AddPlayer";

export default {
  title: "Components/AddPlayer",
  component: AddPlayer,
};

const Template = (args) => <AddPlayer {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
