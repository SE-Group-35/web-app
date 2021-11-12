import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BlogPostsSort from "../BlogPostsSort";
import { MenuItem, TextField } from "@material-ui/core";

configure({ adapter: new Adapter() });

describe("<BlogPostsSort />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BlogPostsSort />);
  });

  it("should render one Text Field Component", () => {
    expect(wrapper.find(TextField)).toHaveLength(1);
  });
  it("should render one Menu Item Component", () => {
    expect(wrapper.find(MenuItem)).toHaveLength(1);
  });
});
