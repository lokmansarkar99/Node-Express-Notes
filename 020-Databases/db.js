import { MongoClient } from "mongodb";


const client = new MongoClient("mongodb://localhost:27017/")

await client.connect()

const db = client.db("node_mongodb")

const userCollection = db.collection("users")
// Create
// userCollection.insertOne({
//     name: "Lokman",
//     age: 22,
//     role: "admin"
// })

// userCollection.insertMany([
//     {
//         name: "Riya",
//         age: 21,
//         role: "user"
//     },
//     {
//         name: "Sagor",
//         age: 22,
//         role: "user"
//     }
// ])


// Read
// const usersCursor = userCollection.find()

//   for await (const user of usersCursor) {
//     console.log(user)
// }


// Read one
// const singleUser = await userCollection.findOne({name: "Lokman"})

// console.log(singleUser._id.toHexString())

// Update

// const updateUser = await userCollection.updateOne({name: "Riya"}, {$set: {age: 26}})

// console.log(updateUser)


// Delete 

const deleteUser =await userCollection.deleteOne({name: "Sagor"} )

console.log(deleteUser)
