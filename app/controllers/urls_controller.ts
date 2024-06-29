import type { HttpContext } from '@adonisjs/core/http'
import { PrismaClient } from '@prisma/client'
import { customAlphabet } from 'nanoid'


const prisma = new PrismaClient()
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 6)

export default class UrlsController {
    /**
   * GET REQUEST: used for getting all posts
   */
  async getAllUrls({response}: HttpContext) {
    const allUrls = await prisma.url.findMany({
      include: { user: true }
    })

    return response.json({
        message: `all URLs retrieved successfully`,
        data: allUrls
      })
  }


    /**
   * GET REQUEST: Used for getting a single post from endpoint localhost:3333/carts/fdgshjfg877tyt where the id = "fdgshjfg877tyt"
   */
    async singleUserUrl({ response, params }: HttpContext) {
      const post = await prisma.user.findUnique({
        where: { id: params.id },
        include: { urls: true }
      })
  
      return response.json({
        message: `urls for user ${post?.email} retrieved successfully`,
        data: post
      })
    }








  public async shortenUrl({ request, response }: HttpContext) {
    const { original, name, description, user_id } = request.only(['original', 'name', 'description', 'user_id']);
    
    try {
      let savedUrl = await prisma.url.findFirst({
        where: { 
          name,
          user_id,
        }
      });
console.log(savedUrl);
  
      if (savedUrl) {
        return response.json({
          message: `URL name ${savedUrl?.name} already in use, use another name or input all fields`,
          data: savedUrl,
          status: 'failure'
        });
      } else {
        let short = nanoid();
        savedUrl = await prisma.url.create({
          data: {
            name,
            description,
            short,
            original,
            user: {
              connect: { id: user_id }
            }
          }
        });
  
        return response.json({
          message: `URL ${savedUrl.name} created successfully, refresh page to effect`,
          data: {
            name,
            description,
            short,
            original
          },
          status: 'success'
        });
      }
    } catch (err) {
      console.log(err);
      return response.status(500).json(`an error occured ${err}`);
    }
  }



  public async getShortUrl({ params, response }: HttpContext) {
    const short = params.short

    try {
      const url = await prisma.url.findUnique({
        where: { short }
      })

      if (url) {
        return response.redirect(url.original)
      } else {
        return response.status(404).json('URL Not Found')
      }
    } catch (err) {
      console.log(err)
      return response.status(500).json('Server Error')
    }
  }
}
