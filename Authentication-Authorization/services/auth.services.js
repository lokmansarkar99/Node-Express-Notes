import prisma from '../controllers/prismaController.js'

export const getUserByEmail = async (email) => {
  // findUnique expects a where object, not empty array
  const user = await prisma.user.findUnique({
    where: { email }
  });
  await console.log("User Exist ")

  return user;
}

export const createUser = async ({ name, email, password }) => {
  const newUser = await prisma.user.create({
    data: { name, email, password }
    
  });

 await console.log(newUser)
  return newUser;
}
