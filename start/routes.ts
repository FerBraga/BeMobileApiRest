import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/signup', 'UsersController.register')
  Route.post('/login', 'UsersController.login')
})
