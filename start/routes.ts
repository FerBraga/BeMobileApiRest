import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/signup', 'UsersController.register')
  Route.post('/login', 'UsersController.login')
  Route.get('/clients', 'ClientesController.index').middleware('auth')
  Route.post('/clients', 'ClientesController.store').middleware('auth')
  Route.post('/products', 'ProdutosController.store').middleware('auth')
  Route.post('/sales', 'VendasController.store').middleware('auth')
  Route.get('/clients/:id', 'ClientesController.show').middleware('auth')
  Route.patch('/clients/:id', 'ClientesController.update').middleware('auth')
  Route.delete('/clients/:id', 'ClientesController.delete').middleware('auth')
  Route.get('/products', 'ProdutosController.index').middleware('auth')
})
