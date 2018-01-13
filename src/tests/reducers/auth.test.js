import { authReducer } from "./../../reducers/auth";

test("should set the uid for login", () => {
  const uid = "123";
  const state = authReducer(undefined, {
    type: "LOGIN",
    uid
  });
  expect(state.uid).toBe(uid);
});

test("should clear the uid on logout", () => {
  const state = authReducer({ uid: '1234' }, {
    type: "LOGOUT"
  });

  expect(state).toEqual({});
});
