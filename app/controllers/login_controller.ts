import type { HttpContext } from '@adonisjs/core/http'
import { PrismaClient } from '@prisma/client'
import Hash from '@adonisjs/core/services/hash'
// @ts-ignore e is an rtk query error
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default class LoginController {
  /**
   * POST REQUEST: Used for logging in a user from endpoint localhost:3333/login
   */
  async store({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    // Fetch the user from the database using the provided email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    // Check if the user exists
    if (!user) {
      return response.status(400).send('Invalid email or password')
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordVerified = await Hash.verify(user.password, password)
    
    if (!passwordVerified) {
      return response.status(400).send('Invalid email or password')
    }

    // Optionally, generate a JWT token if using JWT for session management
    const token = jwt.sign({ id: user.id }, 'your-secret-key', { expiresIn: '1h' })

    // Return a success response
    return response.status(200).send({
      message: 'User Login Successful',
      status: 'success',
      token, // Uncomment if using JWT
      data: {
        id: user.id,
        email: user.email,
      },
    })
  }
}
