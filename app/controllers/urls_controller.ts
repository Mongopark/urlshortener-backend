import type { HttpContext } from '@adonisjs/core/http'
import { PrismaClient } from '@prisma/client'
import { customAlphabet } from 'nanoid'

const prisma = new PrismaClient()
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 8)

export default class UrlsController {
  public async shortenUrl({ request, response }: HttpContext) {
    const original = request.input('original')

    try {
      let savedUrl = await prisma.url.findFirst({
        where: { original }
      })

      let short: string
      if (savedUrl) {
        short = savedUrl.short
      } else {
        short = nanoid()
        savedUrl = await prisma.url.create({
          data: {
            short,
            original
          }
        })
      }

      return response.json({
        short_url: short,
        original_url: original
      })
    } catch (err) {
      console.log(err)
      return response.status(500).json('Server Error')
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
