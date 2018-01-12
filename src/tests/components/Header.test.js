import React from "react";
import { shallow } from "enzyme";
import { Header } from "./../../components/Header";

test("should render Header component correctly", () => {
  const wrapper = shallow(<Header logout={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});

test("should call start logout on button click", () => {
  const startLogout = jest.fn();
  const wrapper = shallow(<Header logout={startLogout} />);
  wrapper.find('button').simulate('click');
  expect(startLogout).toHaveBeenCalled();
});
