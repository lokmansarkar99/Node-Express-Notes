import prisma from '../controllers/prismaController.js'
import argon2 from 'argon2'
export const getUserByEmail = async (email) => {
  // findUnique expects a where object, not empty array
  const user = await prisma.user.findUnique({
    where: { email }
  });
  await console.log("User Exist ")

  return user;
}

export const createUser = async ({ name, email, password }) => {
  // Hash the password before storing it
  const hashedPassword = await argon2.hash(password)

  const newUser = await prisma.user.create({
    data: { name, email, password:hashedPassword }
    
  });

 await console.log(newUser)
  return newUser;
}
