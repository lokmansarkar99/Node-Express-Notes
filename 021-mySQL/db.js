import mysql from 'mysql2/promise'
let db;
// CONNECT TO MYSQL SERVER
let dbConnect = async () => {
     db = await  mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ex_crud"

    
})
// CREATE A DB
// await db.execute(`create database node_mysqldb`)
// console.log(db.exexute("show databases"))
//CREATE A TABLE

// await db.execute(`
//     CREATE TABLE users(
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     username VARCHAR(100) NOT NULL,
//     email VARCHAR(100) NOT NULL UNIQUE
//     )
//     `)
//PERFOM CRUD OPERATION
// insert inline 
// await db.execute(`
//     insert into users(username,email) values('lokman', 'lokman@mail.com')
//     `)

// insert prepared 
// await db.execute(`
//     insert into users(username,email) values(?, ?)
//     `, ["riya", "riya@mail.com"])


// insert multiple 
// const values = [
//     ["alice", "alice@mail.com"],
//     ["bob", "bob@mail.com"],
//     ["charlie", "charlie@mail.com"],
//     ["david", "david@mail.com"],
//     ["emma", "emma@mail.com"],
//     ["frank", "frank@mail.com"],
// ]

// await db.query("INSERT INTO users (username, email) VALUES ?", [values]);
// read
const [rows, fields] = await db.execute(`
    select * from users
    `)
    console.log(rows)

// read condition
// const [rows, fields] = await db.execute(`
//     select * from users where username = "riya"
//     `)

//     console.log(rows)

// update

// try {
//     const [rows] = await db.execute(`update users set email = "riyarahman@mail.com" where username = "riya"`)

//     console.log(rows)
// } catch (error) {
//     console.log(error)
// }


// delete 
// try {
//     const [rows] = await db.execute(`delete from users where username = "emma"`)
//     console.log(rows)
// } catch (error) {
//     console.log(error)
// }

}



export default dbConnect;