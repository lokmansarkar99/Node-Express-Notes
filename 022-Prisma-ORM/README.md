# Prisma ORM with Express.js and MySQL 🚀

This guide will help you set up Prisma ORM with an Express.js backend and a MySQL database from scratch.

---

## 📦 Prerequisites

* Node.js installed (v16+ recommended)
* MySQL installed and running
* `npm` or `yarn` as package manager

---

## ⚙️ Step-by-Step Setup

### 1. Initialize your Node.js project

```bash
npm init -y
```

### 2. Install dependencies

```bash
npm install express prisma @prisma/client mysql2 dotenv
```

---

## 🔨 Initialize Prisma

### 3. Init Prisma project

```bash
npx prisma init
```

This creates:

* `prisma/schema.prisma`
* `.env` file

### 4. Configure `.env`

```env
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/YOUR_DB_NAME"
```

Replace `USER`, `PASSWORD`, and `YOUR_DB_NAME` with your MySQL credentials.

---

## 🖋️ Define Your Schema

### 5. Edit `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "./generated/prisma"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt
}
```

---

## 📂 Migrate and Generate

### 6. Create your DB & generate client

```bash
npx prisma migrate dev --name init
```

### 7. Generate Prisma Client

```bash
npx prisma generate
```

---

## 📁 Prisma Client Usage

### 8. Use in Express app

```js
// server.js
import express from 'express';
import { PrismaClient } from './generated/prisma/index.js';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.post('/users', async (req, res) => {
  try {
    const user = await prisma.user.create({ data: req.body });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

---

## 🎡 Prisma Studio

### 9. Open visual DB UI

```bash
npx prisma studio
```

---

## ⚠️ Common Issues

### Unique Constraint Error

```
PrismaClientKnownRequestError: Unique constraint failed on the field: `User_email_key`
```

**Fix**: Use `skipDuplicates: true` with `createMany()` or ensure the email is not already in DB.

### Invalid Directory Import

```
ERR_UNSUPPORTED_DIR_IMPORT: Did you mean to import './generated/prisma/index.js'?
```

**Fix**: Import the specific file:

```js
import { PrismaClient } from './generated/prisma/index.js';
```

---

## 💡 Tips

* Always use `await prisma.$disconnect()` if you're exiting a script manually.
* Wrap all Prisma calls in try/catch blocks to handle errors gracefully.

---

## 🚀 You're Ready!

You now have Prisma connected with MySQL in an Express.js backend!

---

## 📄 Resources

* Prisma Docs: [https://www.prisma.io/docs](https://www.prisma.io/docs)
* Prisma Schema: [https://www.prisma.io/docs/reference/api-reference/prisma-schema](https://www.prisma.io/docs/reference/api-reference/prisma-schema)
* Express Docs: [https://expressjs.com/](https://expressjs.com/)
