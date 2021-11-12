import {
  getProfile,
  getUserLoggingInStatus,
  getActiveStatus,
  getCurrentRole,
} from "./../../auth";

describe("Selector Functions of Auth State", () => {
  test("Should return profile of user", () => {
    const mockState = () => ({
      firebase: {
        profile: {
          telephone: "0771234567",
          firstName: "Mahendra",
          Enabled: true,
          userRole: { admin: true, traveller: false },
          email: "ms28@gmail.com",
          lastName: "Singh",
        },
      },
    });

    const result = getProfile(mockState());
    expect(result).toStrictEqual({
      telephone: "0771234567",
      firstName: "Mahendra",
      Enabled: true,
      userRole: { admin: true, traveller: false },
      email: "ms28@gmail.com",
      lastName: "Singh",
    });
  });

  test("Should return logging in status", () => {
    const mockState = () => ({
      auth: {
        loggingIn: false,
      },
    });

    const result = getUserLoggingInStatus(mockState());
    expect(result).toStrictEqual(false);
  });

  test("Should return active status", () => {
    const mockState = () => ({
      auth: {
        active: false,
      },
    });

    const result = getActiveStatus(mockState());
    expect(result).toStrictEqual(false);
  });

  test("Should return current role", () => {
    const mockState = () => ({
      auth: {
        role: "Admin",
      },
    });

    const result = getCurrentRole(mockState());
    expect(result).toStrictEqual("Admin");
  });
});
