import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Venda from 'App/Models/Venda'

export default class VendasController {
  public async store({ request, response }: HttpContextContract) {
    const newSaleSchema = schema.create({
      produto_id: schema.number(),
      cliente_id: schema.number(),
      quantidade: schema.number(),
      preco_uni: schema.number(),
      preco_total: schema.number(),
    })

    try {
      await request.validate({
        schema: newSaleSchema,
      })
    } catch ({ messages: { errors } }) {
      return { erro: errors[0].message }
    }

    try {
      const created = await Venda.create(request.body())
      return response.status(201).json(created)
    } catch (err) {
      return response.badRequest({ message: 'Não foi possível inserir a venda' })
    }
  }
}
