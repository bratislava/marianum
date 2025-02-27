import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import useSWR from 'swr'

import TabItem from '@/components/atoms/Tabs/TabItem'
import Tabs from '@/components/atoms/Tabs/Tabs'
import Checklist from '@/components/molecules/Checklist/Checklist'
import ChecklistSkeleton from '@/components/molecules/Checklist/ChecklistSkeleton'
import { getProceduresSwrKey, proceduresFetcher } from '@/services/fetchers/proceduresFetcher'
import { isDefined } from '@/utils/isDefined'
import { useGetSwrExtras } from '@/utils/useGetSwrExtras'

const ProcedureTabs = () => {
  const { i18n } = useTranslation()

  const { data, error } = useSWR(
    getProceduresSwrKey(i18n.language),
    proceduresFetcher(i18n.language),
  )

  const { dataToDisplay, loadingAndNoDataToDisplay } = useGetSwrExtras({ data, error })

  const { outsideMedicalFacility, atMedicalFacility } =
    dataToDisplay?.procedures?.data?.attributes ?? {}

  const proceduresWithKeys = useMemo(() => {
    return [
      { key: 'outsideMedicalFacility', ...outsideMedicalFacility },
      { key: 'atMedicalFacility', ...atMedicalFacility },
    ]
  }, [outsideMedicalFacility, atMedicalFacility])

  if (error) {
    return <div>Error: {error}</div>
  }

  if (loadingAndNoDataToDisplay) {
    return (
      <div className="flex flex-1 animate-pulse flex-col gap-9">
        <div className="flex flex-col items-stretch gap-4 sm:flex-row">
          <div className="relative flex flex-1 flex-wrap items-center justify-center gap-2 border border-gray bg-gray px-8 pb-6 pt-5">
            <div className="h-4 w-16 rounded bg-white" />
            <div className="h-4 w-28 rounded bg-white" />
            <div className="h-4 w-12 rounded bg-white" />
            <div className="h-4 w-32 rounded bg-white" />
            <div className="absolute -bottom-3 hidden size-6 rotate-[-39deg] skew-x-12 bg-gray sm:block" />
          </div>
          <div className="flex flex-1 flex-wrap items-center justify-center gap-2 border border-border px-8 pb-6 pt-5">
            <div className="h-4 w-16 rounded bg-gray" />
            <div className="h-4 w-24 rounded bg-gray" />
            <div className="h-4 w-8 rounded bg-gray" />
          </div>
        </div>
        <ChecklistSkeleton />
      </div>
    )
  }

  return (
    <Tabs>
      {proceduresWithKeys.filter(isDefined).map((procedure) => (
        <TabItem key={procedure.key} title={procedure.title}>
          <div>
            <Checklist
              localStorageId={procedure.key}
              updatedAt={dataToDisplay?.procedures?.data?.attributes?.updatedAt}
              items={(procedure.steps ?? []).filter(isDefined)}
              downloadFile={procedure.downloadFile?.data}
            />
          </div>
        </TabItem>
      ))}
    </Tabs>
  )
}

export default ProcedureTabs
