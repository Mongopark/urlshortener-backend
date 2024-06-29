import type { HttpContext } from '@adonisjs/core/http'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import Hash from '@adonisjs/core/services/hash'
// import jwt from 'jsonwebtoken'

export default class RegisterController {
/**
   * POST REQUEST: Used for creating a single user from endpoint localhost:3333/register
   */
async store({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
   // Check if the user already exists
   const existingUser = await prisma.user.findUnique({ where: { email } })
   if (existingUser) {
     return response.status(400).send('User already exists')
   }
   // Hash the password before saving
   const hashedPassword = await Hash.make(password)

   // Save the user to the database with the hashed password
   const user = await prisma.user.create({
     data: {
       email,
       password: hashedPassword,
     },
   })

   
   
    return response.status(200).send({
        message: 'Account Created Successfully',
        data: user,
      })
}
}











































// // THIS WORKS WITH NAME, EMAIL AND PASSWORD
// import type { HttpContext } from '@adonisjs/core/http'
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()
// import Hash from '@adonisjs/core/services/hash'
// // import jwt from 'jsonwebtoken'

// export default class RegisterController {
// /**
//    * POST REQUEST: Used for creating a single user from endpoint localhost:3333/register
//    */
// async store({ request, response }: HttpContext) {
//     const { name, email, password } = request.only(['name', 'email', 'password'])
//    // Check if the user already exists
//    const existingUser = await prisma.user.findUnique({ where: { email, name } })
//    if (existingUser) {
//      return response.status(400).send('User already exists')
//    }
//    // Hash the password before saving
//    const hashedPassword = await Hash.make(password)

//    // Save the user to the database with the hashed password
//    const user = await prisma.user.create({
//      data: {
//        name,
//        email,
//        password: hashedPassword,
//      },
//    })
   
//     return response.status(200).send({
//         message: 'Account Created Successfully',
//         data: user,
//       })
// }
// }



