import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UsersController {
  public async register({ request, response }: HttpContextContract) {
    const newUserSchema = schema.create({
      email: schema.string({}, [
        rules.email(),
        rules.required(),
        rules.unique({ table: 'users', column: 'email' }),
      ]),
      password: schema.string({}, [rules.required(), rules.minLength(9)]),
    })

    try {
      await request.validate({
        schema: newUserSchema,
      })
    } catch ({ messages: { errors } }) {
      return { erro: errors[0].message }
    }

    try {
      const newUser = await User.create(request.body())
      return response.status(201).json({ newUser })
    } catch (error) {
      return response.badRequest({
        message: 'Não foi possível efetuar cadastro',
      })
    }
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.all()

    const userSchema = schema.create({
      email: schema.string({}, [rules.email(), rules.required()]),
      password: schema.string({}, [rules.required(), rules.minLength(9)]),
    })

    try {
      await request.validate({
        schema: userSchema,
      })
    } catch ({ messages: { errors } }) {
      return { erro: errors[0].message }
    }

    try {
      const token = await auth.use('api').attempt(email, password)
      // apenas usuários que tenham cadastro no banco de dados podem gerar Token.
      return response.status(200).json(token)
    } catch (error) {
      return response.badRequest({ message: 'usuário não cadastrado' })
    }
  }
}
