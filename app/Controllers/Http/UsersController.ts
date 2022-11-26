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

    const result = await request.validate({
      schema: newUserSchema,
    })

    try {
      const newUser = await User.create(result)
      return response.status(201).json({ newUser })
    } catch (error) {
      return response.badRequest('Não foi possível cadastrar: Senha, ou email inválidos')
    }
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.all()

    const userSchema = schema.create({
      email: schema.string({}, [rules.email(), rules.required()]),
      password: schema.string({}, [rules.required(), rules.minLength(9)]),
    })

    await request.validate({
      schema: userSchema,
    })

    try {
      const token = await auth.use('api').attempt(email, password)
      return response.status(200).json(token)
    } catch (error) {
      return response.badRequest('usuário não cadastrado')
    }
  }
}
