import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Produto from './Produto'
import Cliente from './Cliente'

export default class Venda extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public cliente_id: number

  @column()
  public produto_id: number

  @column()
  public quantidade: number

  @column()
  public preco_uni: number

  @column()
  public preco_total: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Cliente, {
    foreignKey: 'cliente_id',
  })
  public clientes: BelongsTo<typeof Cliente>

  @belongsTo(() => Produto, {
    foreignKey: 'produto_id',
  })
  public produtos: BelongsTo<typeof Produto>
}
