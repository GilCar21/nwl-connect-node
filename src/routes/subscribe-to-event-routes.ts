import {z} from "zod"
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"

export const subscribeToEventRoute: FastifyPluginAsyncZod = async (app) =>{
    app.post('/subscriptions',{
        schema:{
            summary: 'Inscreve alguém no evento',
            tags: ['subscription'],
            body: z.object({
                name: z.string(),
                email: z.string().email(),
            })
        }
    }, async (request, reply)=>{
        const { name, email } = request.body
    
        return reply.status(201).send({
            name,
            email,
        })
    } )
}