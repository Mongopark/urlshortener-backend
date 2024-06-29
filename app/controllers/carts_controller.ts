//THIS CONTROLLER INTERACTS WITH THE DATABASE
import type { HttpContext } from '@adonisjs/core/http'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default class CartsController {
  /**
   * GET REQUEST: used for getting all posts
   */
  async index({}: HttpContext) {
    const allPosts = await prisma.post.findMany()

    return allPosts
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {
  }

  /**
   * POST REQUEST: Used for creating a single post from endpoint localhost:3333/carts
   */
  async store({ request }: HttpContext) {
     const post = await prisma.post.create({
      data: request.only(['title', 'content'])
     }) 
    
     return post
}

  /**
   * GET REQUEST: Used for getting a single post from endpoint localhost:3333/carts/fdgshjfg877tyt where the id = "fdgshjfg877tyt"
   */
  async show({ params }: HttpContext) {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
    })

    return post
  }

  /**
   * Edit individual record
   */
        // @ts-ignore e is an rtk query error
  async edit({ params }: HttpContext) {}

  /**
   * PATCH REQUEST: Used for updating/changing a single post, a body {"title": "michael scottfield", "content": "prison breaker"} will be passed to the endpoint localhost:3333/carts/fdgshjfg877tyt where the id = "fdgshjfg877tyt"
   */
  async update({ params, request }: HttpContext) {
    const post = await prisma.post.update({
      where: { id: params.id },
      data: request.only(['title', 'content']),
    })

    return post
  }

  /**
   * DELETE REQUEST: used to delete a single post from endpoint localhost:3333/carts/fdgshjfg877tyt where the id = "fdgshjfg877tyt"
   */
  async destroy({ params }: HttpContext) {
    const post = await prisma.post.delete({

      where: { id: params.id },

    })

    return post
  }
}