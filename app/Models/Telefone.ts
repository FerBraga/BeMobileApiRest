import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'

export default class Telefone extends BaseModel {
  @hasOne(() => Cliente)
  public cliente: HasOne<typeof Cliente>

  @column({ isPrimary: true })
  public id: number

  @column()
  public numero: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
