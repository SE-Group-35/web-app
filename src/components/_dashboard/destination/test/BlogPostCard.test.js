import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BlogPostCard from "../BlogPostCard";
import CheckPropTypes from "check-prop-types";
import renderer from "react-test-renderer";

configure({ adapter: new Adapter() });

describe("<BlogPostCard />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BlogPostCard post={post} />);
  });

  const postimage = require("../../../assets/images/sigiriya.jpg");

  const post = {
    title: "Sinharaja Rain Forest",
    description:
      "The value of Sinharaja as a natural World Heritage site continues to be recognized by the discovery of several endemic species of plants and animals with a huge diversity since the declaration of this forest as a World Heritage in 1988.",
  };

  const wrongPropType = {
    post: 3,
  };

  it("should not throw an error if correct prop types are passed", () => {
    const propsErr = CheckPropTypes(
      BlogPostCard.propTypes,
      post,
      "props",
      BlogPostCard.name
    );
    expect(propsErr).toBeUndefined();
  });
  it("should throw an error if incorrect prop types are passed", () => {
    const propsErr = CheckPropTypes(
      BlogPostCard.propTypes,
      wrongPropType,
      "props",
      BlogPostCard.name
    );
    expect(propsErr).toBeDefined();
  });

  it("should match the snapshot with correct prop types", () => {
    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
