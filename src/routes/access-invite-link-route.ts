import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { env } from '../env'
import { accessInviteLink } from '../functions/access-invite-link'

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        summary: 'Acessa o link de convite e redireciona o usuário',
        tags: ['referral'], // "indicação"
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          200: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params

      await accessInviteLink({ subscriberId })

      //console.log(await redis.hgetall('referral:access-count'))

      const redirectUrl = new URL(env.WEB_URL)

      redirectUrl.searchParams.set('referrer', subscriberId) // id de quem indicou

      return reply.redirect(redirectUrl.toString(), 302)
    }
  )
}
