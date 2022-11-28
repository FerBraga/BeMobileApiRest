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

  public async show({ request, response }: HttpContextContract) {
    const { id } = request.params()
    try {
      console.log(id, 'id aqui')
      const [returned] = await Database.rawQuery(
        'SELECT quantidade,preco_uni, preco_total, cliente_id, produto_id, YEAR(created_at) as ano,' +
          'MONTH(created_at) as mes FROM vendas WHERE cliente_id = ? ORDER BY ano DESC, mes DESC',
        [id]
      )
      return response.status(200).json(returned)
    } catch (error) {
      return response.notFound('Vendas do cliente não encontradas')
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const { nome, cpf } = request.body()

    const clientUpdatedSchema = schema.create({
      nome: schema.string({}, [rules.required()]),
      cpf: schema.string({}, [
        rules.required(),
        rules.minLength(11),
        rules.maxLength(11),
        rules.unique({ table: 'clientes', column: 'cpf' }),
      ]),
    })

    await request.validate({
      schema: clientUpdatedSchema,
    })

    try {
      const userFound = await Cliente.find(id)
      if (userFound) {
        userFound.nome = nome
        userFound.cpf = cpf
      }
      await userFound?.save()
      return response.status(200).json(userFound)
    } catch (error) {
      return response.notAcceptable('Não foi possível editar ')
    }
  }

  public async delete({ request, response }: HttpContextContract) {
    const { id } = request.params()

    try {
      const clientFound = await Cliente.findOrFail(id)
      if (clientFound) await clientFound.delete()
      return response.status(200).json({ message: 'cliente deletado com sucesso' })
    } catch (error) {
      return response.methodNotAllowed('Não foi possível deletar o cliente')
    }
  }
}
