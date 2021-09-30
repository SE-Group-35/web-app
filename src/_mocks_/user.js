import faker from "faker";
import { sample } from "lodash";
// utils
import { mockImgAvatar } from "../utils/mockImages";

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: mockImgAvatar(index + 1),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),

  Enabled: sample([true, false]),
  admin: sample([true, false]),
  telephone: faker.phone.phoneNumberFormat(),
  email: faker.internet.email(),
}));

export default users;
