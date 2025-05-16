import { PrismaClient } from "./generated/prisma/index.js";

const prisma = new PrismaClient();

const main = async () => {
  //user
  const user = await prisma.user
// Create (Insert a User)
// const createUser = await user.create({
//     data: {
//       name: "Sadia",
//       email: "Sadia@mail.com",
//     },
//   });
//   console.log(createUser);


// Create (Insert multiple User)
// const createUsers = await user.createMany({
//     data: [
//         {
//       name: "Riva",
//       email: "Riva@mail.com",
//     },

//          {
//       name: "Alice",
//       email: "Alice@mail.com",
//     },

//          {
//       name: "Bob",
//       email: "Bob@mail.com",
//     },
//     ]
//   });
//   console.log(createUsers);


// Read Users
// const getUsers = await user.findMany()

// console.log(getUsers)

// Read Single User

// const getUser = await user.findUnique({
//     where: {id: 1
//     }
// })
// console.log(getUser)


//Update User

// const updateUser = await user.update({
//   where: {id: 10},
//   data: {name: "Bob the builder"}

    
// })
// console.log(updateUser)

//Update Multiple
// const updateUsers = await user.updateMany({
//   where: {name: "Bob"},
//   data: {email: "bob@bob.com"}

    
// })
// console.log(updateUsers)



// Delete User 
// const deleteUser = await user.delete({
//     where: {id: 9}
// })

// console.log(deleteUser)


// Delete User 
const deleteUsers = await prisma.user.deleteMany({
  where: {
    OR: [
      { id: 4 },
      { id: 8 }
    ]
  }
});

console.log(deleteUsers);


};

export default main;

