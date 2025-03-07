import { eq, inArray } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'
import { redis } from '../redis/client'

export async function getRanking() {
  const ranking = await redis.zrevrange('referral:ranking', 0, 2, 'WITHSCORES') // retorna o top3

  /*
  objeto ranking segue o formato :
  ['id-do-top-1', 134, 'id-do-top-2', 98, 'id-do-top-3', 53]
  */

  const subscriberIdAndScore: Record<string, number> = {}

  for (let i = 0; i < ranking.length; i += 2) {
    //subscriberIdAndScore[id] = pontuação
    subscriberIdAndScore[ranking[i]] = Number.parseInt(ranking[i + 1])
  }

  const subscribers = await db
    .select()
    .from(subscriptions)
    .where(inArray(subscriptions.id, Object.keys(subscriberIdAndScore)))

  const rankingWithScore = subscribers
    .map(subscriber => {
      return {
        id: subscriber.id,
        name: subscriber.name,
        score: subscriberIdAndScore[subscriber.id],
      }
    })
    .sort((sub1, sub2) => {
      // descending
      return sub2.score - sub1.score
    })

  return { ranking: rankingWithScore }
}
