import React from 'react'
import {hasMutedWord} from '@atproto/api/dist/moderation/mutewords'
import {useQuery} from '@tanstack/react-query'

// TEMP
import {makeSearchLink} from '#/lib/routes/links'
import {STALE} from '#/state/queries'
import {usePreferencesQuery} from '#/state/queries/preferences'

export type TrendingTopic = {
  topic: string
  displayName: string
  description: string
  link: string
}

export const DEFAULT_LIMIT = 12

export const trendingTopicsQueryKey = ['trending-topics']

export function useTrendingTopics() {
  const {data: preferences} = usePreferencesQuery()
  const mutedWords = React.useMemo(() => {
    return preferences?.moderationPrefs?.mutedWords || []
  }, [preferences?.moderationPrefs])

  return useQuery({
    refetchOnWindowFocus: true,
    staleTime: STALE.MINUTES.THIRTY,
    queryKey: trendingTopicsQueryKey,
    async queryFn() {
      /*
      try {
        const params = new URLSearchParams()
        params.set('viewer', agent.session?.did || '')
        const res = await fetch(
          ``,
          {
            headers: {
              Authorization:
                'Bearer ',
            },
          },
        )

        if (!res.ok) {
          throw new Error('Failed to fetch trending topics')
        }

        const data = await res.json()
        return data.topics
      } catch (e) {
        console.error(e)
      }
      */
      const topics: TrendingTopic[] = [
        {
          topic: '#atproto',
          displayName: '#atproto',
          description: '',
          link: '/hashtag/atproto',
        },
        {
          topic: 'South Korea',
          displayName: 'South Korea',
          description: '',
          link: makeSearchLink({query: 'South Korea'}),
        },
        {
          topic: 'Paul Frazee',
          displayName: 'Paul Frazee',
          description: '',
          link: 'at://did:plc:ragtjsm2j2vknwkz3zp4oxrd/app.bsky.actor.profile/self',
        },
        {
          topic: 'Wired',
          displayName: 'Wired',
          description: '',
          link: makeSearchLink({query: 'Wired'}),
        },
        {
          topic: 'Quiet Posters',
          displayName: 'Quiet Posters',
          description: '',
          link: 'at://did:plc:vpkhqolt662uhesyj6nxm7ys/app.bsky.feed.generator/infreq',
        },
      ]
      return {
        topics: topics.filter(t => {
          return !hasMutedWord({
            mutedWords,
            text: t.topic + ' ' + t.displayName + ' ' + t.description,
          })
        }),
        recommended: [],
      }
    },
  })
}