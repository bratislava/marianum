import { MeiliSearch } from 'meilisearch'

export const meiliClient = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILI_HOST ?? '',
  apiKey: process.env.NEXT_PUBLIC_MEILI_API_KEY,
})
