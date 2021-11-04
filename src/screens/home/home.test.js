import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import home from "./index";
import { Grid } from "@material-ui/core";

configure({ adapter: new Adapter() });

describe("<home />", () => {
  it("should render one Grid Component", () => {});
});
