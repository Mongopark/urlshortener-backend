//THIS CONTROLLER INTERACTS WITH THE SESSION
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  /**
   * Display a list of resources
   */
  async index({ session, response }: HttpContext) {
    const allPosts = session.get('all-posts') || [];
    console.log(allPosts);
    return response.json({
      message: "Your posts were retrieved successfully",
      length: allPosts.length,
      posts: allPosts,
    });
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, session, response }: HttpContext) {
    // Extract the entire post data from the request
    const singlePost = request.only(['product_id', 'item', 'quantity', 'category']);
    let allPosts = session.get('all-posts') || []; // Initialize as empty array if null or undefined

    allPosts = [...allPosts, singlePost]; // Use the spread operator to add the new post

    session.put('all-posts', allPosts); // Store the updated array in the session
    console.log(`The post ${singlePost.item} was added successfully`);

    return response.json({
      message: `The post ${singlePost.item} was added successfully`,
      post: singlePost,
    });
  }

  /**
   * Show individual record
   */
  async show({ params, session, response }: HttpContext) {
    const id = params.id;
    let allPosts = session.get('all-posts') || []; // Initialize as empty array if null or undefined

    // Find the post with the matching ID
    const post = allPosts.find((post: any) => post.product_id === id);

    if (post) {
      return response.json({
        message: "Post found successfully",
        post: post
      });
    } else {
      return response.json({
        message: "Post not found"
      });
    }
  }

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
  async destroy({ params, session }: HttpContext) {
    const id = params.id;
    if (id === ':please_delete') {
      session.clear();
      console.log("Session cleared successfully");
      return "Session cleared successfully";
    } else{
    return "Session clearing failed";
    }
  }
}
