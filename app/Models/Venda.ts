import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Produto from './Produto'
import Cliente from './Cliente'

export default class Venda extends BaseModel {
  @hasOne(() => Produto)
  public produto_id: HasOne<typeof Produto>

  @hasOne(() => Cliente)
  public cliente_id: HasOne<typeof Cliente>

  @column({ isPrimary: true })
  public id: number

  @column()
  public quantidade: number

  @column()
  public preco_uni: number

  @column()
  public preco_total: number

  @column()
  public data_hora: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
