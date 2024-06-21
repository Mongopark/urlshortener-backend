import type { HttpContext } from '@adonisjs/core/http'

export default class CartsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return `the post was added successfully`
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const { product_id, item, quantity, category } = request.body();
    console.log(`the post ${item} was added successfully`)
        return `the post ${item} was added successfully`;
}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}