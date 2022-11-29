import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'

export default class Endereco extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public cliente_id: number

  @column()
  public cidade: string

  @column()
  public bairoo: string

  @column()
  public rua: string

  @column()
  public numero: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Cliente, {
    foreignKey: 'cliente_id',
  })
  public cliente: BelongsTo<typeof Cliente>
}
