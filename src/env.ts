import { z } from 'zod'

// "obriga" a aplicação a ter as variáveis de ambiente definidas.
const envSchema = z.object({
  PORT: z.coerce.number().default(3333), // todas as variaveis de ambiente são strings, então é necessário converter PORT para number.
  POSTGRES_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  // WEB_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)