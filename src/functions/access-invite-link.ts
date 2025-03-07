import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'
import { redis } from '../redis/client'

interface AccessInviteLinkParams {
  subscriberId: string
}

export async function accessInviteLink({
  subscriberId,
}: AccessInviteLinkParams) {
  // h: hashes -> equivalem a objetos
  await redis.hincrby('referral:access-count', subscriberId, 1)
  // para um inscrito que indicou outro, a cada indicação, aumenta em 1 sua contagem de indicações
}

/*
ex:
{
  'id-do-inscrito-123': 1
}
*/
