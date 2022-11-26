import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from 'App/Models/Cliente'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'

export default class ClientesController {
  public async index({ response }: HttpContextContract) {
    try {
      const [returned] = await Database.rawQuery(
        'SELECT id, nome, cpf FROM clientes ORDER BY id ASC'
      )
      return response.status(200).json(returned)
    } catch (error) {
      return response.notFound('Não foi possível listar clientes')
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const newClietnSchema = schema.create({
      nome: schema.string({}, [rules.required()]),
      cpf: schema.string({}, [
        rules.required(),
        rules.minLength(11),
        rules.maxLength(11),
        rules.unique({ table: 'clientes', column: 'cpf' }),
      ]),
    })

    try {
      const result = await request.validate({
        schema: newClietnSchema,
      })
      const created = await Cliente.create(result)
      return response.status(201).json(created)
    } catch (err) {
      return response.badRequest('Campos inválidos ou cliente já cadastrado')
    }
  }
}
