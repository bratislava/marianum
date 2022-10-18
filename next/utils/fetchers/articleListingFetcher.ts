import { Key } from 'swr'

import { ArticleMeili } from '../../types/meiliTypes'
import { isDefined } from '../isDefined'
import { meiliClient } from '../meilisearch'

export enum ArticleListingType {
  News,
  Press,
}

export type ArticleListingFilters = {
  pageSize: number
  search: string
  categoryId: string | null
  page: number
}

export const articleListingDefaultFilters: ArticleListingFilters = {
  pageSize: 24,
  search: '',
  categoryId: null,
  page: 1,
}

export const getArticleListingSwrKey = (
  filters: ArticleListingFilters,
  type: ArticleListingType,
  locale?: string,
) => ['ArticleListing', filters, type, locale] as Key

export const getArticleListingFetcher =
  (filters: ArticleListingFilters, type: ArticleListingType, locale?: string) => () => {
    let sectionFilter: string | null = null

    // eslint-disable-next-line default-case
    switch (type) {
      case ArticleListingType.Press:
        sectionFilter = filters.categoryId
          ? `pressCategory.id = ${filters.categoryId}`
          : // TODO: hacky solution, after update to Meilisearch 0.29 use "pressCategory EXISTS"
            'pressCategory.id > 0'
        break

      case ArticleListingType.News:
        sectionFilter = filters.categoryId
          ? `newsCategory.id = ${filters.categoryId}`
          : // TODO: hacky solution, after update to Meilisearch 0.29 use "newsCategory EXISTS"
            'newsCategory.id > 0'
        break
    }

    return meiliClient.index('article').search<ArticleMeili>(filters.search, {
      limit: filters.pageSize,
      offset: (filters.page - 1) * filters.pageSize,
      filter: [sectionFilter, locale ? `locale = ${locale}` : null].filter(isDefined),
      sort: ['publishedAtTimestamp:desc'],
    })
  }

export const getArticleListingNewsPrefetches = (locale: string) => {
  const argsNews = [articleListingDefaultFilters, ArticleListingType.News, locale] as const
  const argsPress = [articleListingDefaultFilters, ArticleListingType.Press, locale] as const

  return [
    {
      sectionTypename: 'ComponentSectionsArticleNewsListing',
      key: getArticleListingSwrKey(...argsNews),
      fetcher: getArticleListingFetcher(...argsNews),
    } as const,
    {
      sectionTypename: 'ComponentSectionsArticlePressListing',
      key: getArticleListingSwrKey(...argsPress),
      fetcher: getArticleListingFetcher(...argsPress),
    } as const,
  ]
}
