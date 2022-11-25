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
      const result = await request.validate({
        schema: newUserSchema,
      })
      const newUser = await User.create(result)
      response.status(201)
      return newUser
    } catch (error) {
      response.badRequest('Não foi possível cadastrar: Senha, ou email inválidos')
    }
  }

  public async login({ request, response }: HttpContextContract) {
    const userSchema = schema.create({
      email: schema.string({}, [rules.email(), rules.required()]),
      password: schema.string({}, [rules.required(), rules.minLength(9)]),
    })

    await request.validate({
      schema: userSchema,
    })

    const { email } = request.body()
    const result = await User.findBy('email', email)
    if (result === null) {
      return response.badRequest('Usuário não cadastrado')
    }
    response.status(200)
    return result
  }
}
