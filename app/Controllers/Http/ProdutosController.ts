import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Produto from 'App/Models/Produto'

export default class ProdutosController {
  public async store({ request, response }: HttpContextContract) {
    const newProductSchema = schema.create({
      nome: schema.string({}, [
        rules.required(),
        rules.unique({ table: 'produtos', column: 'nome' }),
      ]),
      autor: schema.string({}, [rules.required()]),
      editora: schema.string({}, [rules.required()]),
      preco: schema.number(),
    })

    const result = await request.validate({
      schema: newProductSchema,
    })

    try {
      const created = await Produto.create(result)
      return response.status(201).json(created)
    } catch (err) {
      return response.badRequest('Não foi possível inserir o produto')
    }
  }
}
