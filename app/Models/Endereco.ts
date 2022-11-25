import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'

export default class Endereco extends BaseModel {
  @hasMany(() => Cliente)
  public clientes: HasMany<typeof Cliente>

  @column({ isPrimary: true })
  public id: number

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
}
