import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import SelectWithFetcher from '@/components/molecules/SelectWithFetcher'
import {
  articleNewsCategoriesSelectFetcher,
  articleNewsCategoriesSelectSwrKey,
} from '@/services/fetchers/articleListingFetcher'

type ArticleNewsCategoriesSelectProps = {
  onCategoryChange: (id: string | null) => void
}

const ArticleNewsCategoriesSelect = ({
  onCategoryChange = () => {},
}: ArticleNewsCategoriesSelectProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'ArticleListing' })

  const defaultOption = useMemo(() => ({ label: t('allCategories'), key: '' }), [t])

  return (
    <SelectWithFetcher
      swrKey={articleNewsCategoriesSelectSwrKey}
      defaultOption={defaultOption}
      fetcher={articleNewsCategoriesSelectFetcher}
      onSelectionChange={(selection: string) => {
        onCategoryChange(selection === '' ? null : selection)
      }}
    />
  )
}

export default ArticleNewsCategoriesSelect
