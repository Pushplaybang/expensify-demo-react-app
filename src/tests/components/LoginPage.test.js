import React from "react";
import { shallow } from "enzyme";
import { LoginPage } from "./../../components/LoginPage";

test("should render the LoginPage component correctly", () => {
  const wrapper = shallow(<LoginPage />);
  expect(wrapper).toMatchSnapshot();
});

test("should call start login on button click", () => {
  const startLogin = jest.fn();
  const wrapper = shallow(<LoginPage login={startLogin} />);
  wrapper.find("button").simulate("click");
  expect(startLogin).toHaveBeenCalled();
});
