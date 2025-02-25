import { fastify } from "fastify"
import { fastifyCors } from "@fastify/cors"
import { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform } from "fastify-type-provider-zod"
import { z } from "zod"
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { subscribeToEventRoute } from "./routes/subscribe-to-event-routes"
import { env } from "../env"

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
    origin: true,
})

app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'NLW Connect',
        description: 'Sistema de inscrição para o evento',
        version: '0.0.1',
      },
    },
    transform: jsonSchemaTransform, // responsavel por integrar o swagger com os tipos, validações e serializações do zod, criando a documentação automaticamente.
  })
  
  app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  })

app.register(subscribeToEventRoute)

app.listen({port: env.PORT}).then(()=>{
    console.log("HTTP server running")
})