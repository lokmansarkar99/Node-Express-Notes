
  import express from 'express';
import { PrismaClient } from "./generated/prisma/index.js";


import main from './prismaController.js';
const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

main()
  .catch((e) => console.log(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

app.get('/' , (req, res) => {
  res.send("Hello Express")
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})