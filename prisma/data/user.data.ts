import { getHashedPassword } from "../seed/utils/main.utils";
import { studentData } from "./student.data";

enum Role {
  STUDENT = "STUDENT",
  ADMIN = "ADMIN",
}

const VL_ADMIN_USERNAME = "admin";
const VL_ADMIN_PASSWORD = "__admin__";

export const getUserData = async () => {
  const adminCredentials = {
    username: VL_ADMIN_USERNAME,
    password: await getHashedPassword(VL_ADMIN_PASSWORD),
    role: Role.ADMIN,
  };

  const studentCredentials = await Promise.all(
    studentData.map(async (student) => ({
      username: student.code,
      password: await getHashedPassword(student.dni),
      role: Role.STUDENT,
    })),
  );

  return [adminCredentials, ...studentCredentials];
};
