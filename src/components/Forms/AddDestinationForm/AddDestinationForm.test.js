import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

import AddDestinationForm from "./AddDestinationForm";

describe("<AddDestinationForm/>", () => {
  beforeEach(() => {
    const wrapper = shallow(<AddDestinationForm />);
  });
  it("ff", () => {
    expect(1).toBeLessThan(5);
  });
});
