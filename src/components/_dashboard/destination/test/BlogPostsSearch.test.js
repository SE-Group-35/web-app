import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BlogPostsSearch from "../BlogPostsSearch";
import CheckPropTypes from "check-prop-types";
import { InputAdornment, Box } from "@material-ui/core";

configure({ adapter: new Adapter() });

describe("<BlogPostsSearch />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BlogPostsSearch posts={posts} />);
  });

  const posts = [
    {
      id: 1,
      title: "Sigiriya",
      description: "description.",
      overview: "gfhfhhhhhhhhhhhhhhfhfhhfhhffh",
      mainPhoto: "url",
    },
    {
      id: 2,
      title: "Dambulla",
      description: "description.",
      overview: "fsgggggggggggggggggfgfgfgf",
      mainPhoto: "url",
    },
  ];

  const wrongPropType = {
    post: 3,
  };

  it("Should not throw an error if correct prop types are passed", () => {
    const propsErr = CheckPropTypes(
      BlogPostsSearch.propTypes,
      posts,
      "props",
      BlogPostsSearch.name
    );
    expect(propsErr).toBeUndefined();
  });
  it("Should throw an error if incorrect prop types are passed", () => {
    const propsErr = CheckPropTypes(
      BlogPostsSearch.propTypes,
      wrongPropType,
      "props",
      BlogPostsSearch.name
    );
    expect(propsErr).toBeDefined();
  });

  it("Should render one Input Adornment Component", () => {
    expect(wrapper.find(InputAdornment)).toHaveLength(1);
  });
  it("Should render one Box Component", () => {
    expect(wrapper.find(Box)).toHaveLength(1);
  });
});
