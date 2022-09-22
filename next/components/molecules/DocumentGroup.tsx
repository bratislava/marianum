import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import DownloadIcon from '../../assets/download.svg'
import { DocumentGroupFragment } from '../../graphql'
import { isDefined } from '../../utils/isDefined'
import Button from '../atoms/Button'
import Row from './Row/Row'

const DocumentGroup = ({ documents }: DocumentGroupFragment) => {
  const { t } = useTranslation()

  const filteredDocuments = useMemo(() => {
    return (documents ?? [])
      .map((document) => document?.document?.data?.attributes)
      .filter(isDefined)
  }, [documents])

  return (
    <div className="flex flex-col gap-4">
      {filteredDocuments?.map(({ title, slug, file }) => (
        <Row
          key={slug}
          title={title}
          linkHref={`${t('paths.documents')}/${slug ?? ''}`}
          button={
            file.data?.attributes?.url ? (
              <Button
                href={file.data?.attributes?.url}
                variant="tertiary"
                startIcon={<DownloadIcon />}
              >
                {t('layouts.DocumentLayout.downloadFile')}
              </Button>
            ) : null
          }
        />
      ))}
    </div>
  )
}

export default DocumentGroup
