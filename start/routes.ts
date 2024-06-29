/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const UsersController = () => import('#controllers/users_controller')
const PostsController = () => import('#controllers/posts_controller')
const CartsController = () => import('#controllers/carts_controller')
const RegisterController = () => import('#controllers/registers_controller')
const LoginController = () => import('#controllers/login_controller')
const UrlController = () => import('#controllers/urls_controller')




router.post('register', [RegisterController, 'store'])


router.post('login', [LoginController, 'store'])


router.get('users', [UsersController, 'getAllUsers'])
router.get('user/:id', [UsersController, 'getSingleUser'])

router.post('url/shorten', [UrlController, 'shortenUrl'])
router.get('url/:short', [UrlController, 'getShortUrl'])
router.get('url', [UrlController, 'getAllUrls'])
router.get('user/url/:id', [UrlController, 'singleUserUrl'])

// router.get('/', async () => {
//   return {
//     hello: 'world',
//   }
// })

router.post('/postbody', async ({ request }) => {
  console.log(request.body()) //logs the body of the post
})

router.resource('posts', PostsController)

router.resource('carts', CartsController)

router.get('/friend', () => {
  return 'This is the login page.'
})

router.get('/about', () => {
  return 'This is the about page.'
})

// router.get('/posts/:id', ({ params }) => {
//   return `This is post with id ${params.id}`
// })


// POST method
// router.post('users', () => {})

// PUT method
router.put('users/:id', () => {})

// PATCH method
router.patch('users/:id', () => {})

// DELETE method
router.delete('users/:id', () => {})


