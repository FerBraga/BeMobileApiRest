import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
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

    try {
      await request.validate({
        schema: newProductSchema,
      })
    } catch ({ messages: { errors } }) {
      return { erro: errors[0].message }
    }

    try {
      const created = await Produto.create(request.body())
      return response.status(201).json(created)
    } catch (err) {
      return response.badRequest({ message: 'Não foi possível inserir o produto' })
    }
  }

  public async index({ response }: HttpContextContract) {
    try {
      const [productsList] = await Database.rawQuery(
        'SELECT nome, preco FROM produtos WHERE deleted_at IS NULL ORDER BY nome ASC'
      )
      return response.status(200).json(productsList)
    } catch (error) {
      return response.badRequest({ message: 'Livros não encontrados' })
    }
  }

  public async show({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const productFound = await Produto.find(id)

    if (productFound) return response.status(200).json(productFound)

    return response.badRequest({ message: 'Não foi possivel encontrar o produto' })
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const { nome, preco } = request.body()

    const productUpdatedSchema = schema.create({
      nome: schema.string({}, [rules.required()]),
      preco: schema.number(),
    })

    try {
      await request.validate({
        schema: productUpdatedSchema,
      })
    } catch ({ messages: { errors } }) {
      return { erro: errors[0].message }
    }

    const productFound = await Produto.find(id)

    if (productFound?.nome && productFound?.preco) {
      productFound.nome = nome
      productFound.preco = preco
      await productFound?.save()
      return response.status(200).json(productFound)
    } else {
      return response.notFound({ message: 'Produto não encontrado.' })
    }
  }

  public async delete({ params, response }: HttpContextContract) {
    //lógica para softdelete - marca o campo deleted_at com data e não retorna na rota de buscas
    const softDeleted = await Database.rawQuery(
      'UPDATE produtos SET deleted_at = now() WHERE id = ?',
      [params.id]
    )

    if (softDeleted?.affectedRows)
      return response.status(200).json({ message: 'Produto excluído com sucesso' })

    return response.methodNotAllowed({ message: 'Não foi possível excluir cliente' })
  }
}
