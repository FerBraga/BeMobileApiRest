import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Venda from './Venda'
import { beforeFind, beforeFetch } from '@ioc:Adonis/Lucid/Orm'
import { softDelete, softDeleteQuery } from '../../app/Services/SoftDelete'

export default class Produto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public autor: string

  @column()
  public editora: string

  @column()
  public preco: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime

  @hasMany(() => Venda, {
    foreignKey: 'produto_id',
  })
  public vendas: HasMany<typeof Venda>

  @beforeFind()
  public static softDeletesFind = softDeleteQuery
  @beforeFetch()
  public static softDeletesFetch = softDeleteQuery

  public async softDelete(column?: string) {
    await softDelete(this, column)
  }
}
