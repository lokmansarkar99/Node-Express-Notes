import prisma from '../controllers/prismaController.js'
import argon2 from 'argon2'
import e from 'connect-flash';
import jwt from 'jsonwebtoken'



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


export const generateToken = ({id,name, email}) =>{
  
  return jwt.sign({id,name, email}, process.env.JWT_SECRET,{
    expiresIn: '30d'
  } )

}


// Verify the token and return the decoded payload
export const verifyToken = (token) => {

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error('Token verification failed:', error);
    throw new Error('Invalid token');
    
  }
}


// CreateSesion
export const createSession = async (userId, {ipAddress, userAgent}) => {
  const session = await prisma.session.create({
    data: {
     user_id:userId,
     ipAddress,
     userAgent
    }
  })

}

// create access token
export const createAccessToken = ({id,name, email, sessionId}) => { 

  return jwt.sign({id, name, email, sessionId}, process.env.JWT_SECRET, {
    expiresIn: '15m' // Access token valid for 15 minutes
  });
}


// Create refresh token
export const createRefreshToken = (sessionId) => {
  return jwt.sign({ sessionId }, process.env.JWT_SECRET, {
    expiresIn: '30d' // Refresh token valid for 30 days
  });
}