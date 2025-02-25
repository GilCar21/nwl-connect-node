import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

//                                    nome da tabela
export const subscriptions = pgTable('subscriptions', {
  //nomeDaVariavel: uuid('nome da coluna na tabela')
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})