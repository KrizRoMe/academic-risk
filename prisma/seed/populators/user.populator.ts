import { prisma } from "../utils/main.utils";
import { getUserData } from "../../data/user.data";

export const userPopulator = async () => {
  const userData = await getUserData();

  for (const user of userData) {
    const userFound = await prisma.user.findUnique({
      where: { username: user.username },
    });

    if (!userFound) {
      await prisma.user.create({ data: user });
    }
  }
};
