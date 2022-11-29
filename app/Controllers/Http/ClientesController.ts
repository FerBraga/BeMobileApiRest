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
      return response.notFound({ message: 'Não foi possível listar clientes' })
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
      await request.validate({
        schema: newClietnSchema,
      })
    } catch ({ messages: { errors } }) {
      return { erro: errors[0].message }
    }

    try {
      const created = await Cliente.create(request.body())
      return response.status(201).json(created)
    } catch (err) {
      return response.badRequest({ message: 'Não foi possível efetuar cadastro de cliente' })
    }
  }

  public async show({ request, response }: HttpContextContract) {
    const { id } = request.params()
    try {
      const [returned] = await Database.rawQuery(
        'SELECT quantidade,preco_uni, preco_total, cliente_id, produto_id, YEAR(created_at) as ano,' +
          'MONTH(created_at) as mes FROM vendas WHERE cliente_id = ? ORDER BY ano DESC, mes DESC',
        [id]
      )
      return response.status(200).json(returned)
    } catch (error) {
      return response.notFound({ message: 'Vendas do cliente não encontradas' })
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

    try {
      await request.validate({
        schema: clientUpdatedSchema,
      })
    } catch ({ messages: { errors } }) {
      return { erro: errors[0].message }
    }

    try {
      const userFound = await Cliente.find(id)
      if (userFound?.nome && userFound?.cpf) {
        userFound.nome = nome
        userFound.cpf = cpf
        await userFound?.save()
        return response.status(200).json(userFound)
      } else {
        return response.badRequest({ message: 'Cliente não encontrado' })
      }
    } catch (error) {
      return response.notAcceptable({ message: 'Não foi possível editar ' })
    }
  }

  public async delete({ request, response }: HttpContextContract) {
    const { id } = request.params()

    try {
      const clientFound = await Cliente.findOrFail(id)
      if (clientFound) await clientFound.delete()
      return response.status(200).json({ message: 'cliente deletado com sucesso' })
    } catch (error) {
      return response.methodNotAllowed({ message: 'Não foi possível deletar o cliente' })
    }
  }
}
