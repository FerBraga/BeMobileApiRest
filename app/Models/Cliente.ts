import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Venda from './Venda'
import Telefone from './Telefone'
import Endereco from './Endereco'

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public cpf: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Venda, {
    foreignKey: 'cliente_id',
  })
  public vendas: HasMany<typeof Venda>

  @hasOne(() => Telefone, {
    foreignKey: 'cliente_id',
  })
  public telefone: HasOne<typeof Telefone>

  @hasOne(() => Endereco, {
    foreignKey: 'cliente_id',
  })
  public endereco: HasOne<typeof Endereco>
}
