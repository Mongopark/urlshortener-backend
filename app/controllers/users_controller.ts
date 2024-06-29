import type { HttpContext } from '@adonisjs/core/http'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class UsersController {
  async index(ctx: HttpContext) {
    return [
      {
        id: 1,
        username: 'virk',
      },
      {
        id: 2,
        username: 'romain',
      },
    ]
  }

  async getAllUsers({response}: HttpContext) {
    const allUrls = await prisma.user.findMany()
    
    return response.json({
        message: `all users retrieved successfully`,
        data: allUrls
      })
  }


  /**
   * GET REQUEST: Used for getting a single post from endpoint localhost:3333/carts/fdgshjfg877tyt where the id = "fdgshjfg877tyt"
   */
  async getSingleUser({ response, params }: HttpContext) {
    const post = await prisma.user.findUnique({
      where: { id: params.id }
    })

    return response.json({
      message: `user ${post?.email} retrieved successfully`,
      data: post
    })
  }
}