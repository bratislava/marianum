import { Key } from 'swr'

import { meiliClient } from '@/services/meili/meiliClient'
import { DisclosureMeili, DisclosureTypeFixed } from '@/services/meili/meiliTypes'
import { getMeilisearchPageOptions } from '@/utils/getMeilisearchPageOptions'

export type DisclosuresSectionFilters = {
  pageSize: number
  search: string
  page: number
  type: DisclosureTypeFixed | null
}

export const disclosuresSectionDefaultFilters: DisclosuresSectionFilters = {
  pageSize: 10,
  search: '',
  page: 1,
  type: null,
}

export const getDisclosuresSectionSwrKey = (filters: DisclosuresSectionFilters) =>
  ['DisclosuresSection', filters] as Key

export const disclosuresSectionFetcher = (filters: DisclosuresSectionFilters) => () =>
  meiliClient.index('disclosure').search<DisclosureMeili>(filters.search, {
    ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
    // Buggy ESLint rule
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    filter: filters.type ? [`type = ${filters.type}`] : [],
    sort: ['publishedAtTimestamp:desc'],
  })

export const disclosuresSectionPrefetch = {
  sectionTypename: 'ComponentSectionsDisclosuresSection',
  key: getDisclosuresSectionSwrKey(disclosuresSectionDefaultFilters),
  fetcher: disclosuresSectionFetcher(disclosuresSectionDefaultFilters),
} as const
