import { getUserRole } from "../getUserRole";

describe("UserRole", () => {
  it("Should return Admin", () => {
    const role = getUserRole({ admin: true, traveller: false });
    expect(role).toBe("Admin");
  });

  it("Should return Traveller ", () => {
    const role = getUserRole({ admin: false, traveller: true });
    expect(role).toBe("Traveller");
  });
});
