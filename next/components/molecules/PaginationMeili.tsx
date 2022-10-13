import { SearchResponse } from 'meilisearch'
import React from 'react'

import Pagination from '../atoms/Pagination/Pagination'

type PaginationMeiliProps = {
  data: SearchResponse
  selectedPage: number
  pageSize: number
  onPageChange?: (page: number) => void
}

const PaginationMeili = ({
  data,
  selectedPage,
  pageSize,
  onPageChange = () => {},
}: PaginationMeiliProps) => {
  const pageCount = data ? Math.ceil(data.estimatedTotalHits / pageSize) : 0

  return pageCount > 0 ? (
    <Pagination
      className="flex justify-center pt-4 md:pt-6"
      selectedPage={selectedPage}
      count={pageCount}
      onChange={onPageChange}
    />
  ) : null
}

export default PaginationMeili