import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import DestinationListToolBar from "../DestinationListToolBar";
import { Typography, Stack } from "@material-ui/core";

configure({ adapter: new Adapter() });

describe("<DestinationListToolBar />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<DestinationListToolBar />);
  });

  it("Should render one Typography Component", () => {
    expect(wrapper.find(Typography)).toHaveLength(1);
  });
  it("Should render two Stack Component", () => {
    expect(wrapper.find(Stack)).toHaveLength(2);
  });
});
