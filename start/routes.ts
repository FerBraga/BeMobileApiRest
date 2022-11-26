import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/signup', 'UsersController.register')
  Route.post('/login', 'UsersController.login')
  Route.get('/clients', 'ClientesController.index').middleware('auth')
  Route.post('/clients', 'ClientesController.store').middleware('auth')
  Route.post('/products', 'ProdutosController.store').middleware('auth')
  Route.post('/sales', 'VendasController.store').middleware('auth')
})
