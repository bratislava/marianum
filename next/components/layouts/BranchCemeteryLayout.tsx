import cx from 'classnames'
import { ReactNode } from 'react'

import PageWrapper from '@/components/layouts/PageWrapper'
import ImageGallery from '@/components/molecules/ImageGallery'
import SideBarContact from '@/components/molecules/SideBarContact'
import HeroSection from '@/components/sections/HeroSection'
import {
  BranchEntityFragment,
  CemeteryEntityFragment,
  GeneralEntityFragment,
  ManagedObjectEntityFragment,
  NavigationItemFragment,
} from '@/graphql'

type BranchCemeteryLayoutProps = {
  entity: BranchEntityFragment | CemeteryEntityFragment | ManagedObjectEntityFragment
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
  children?: ReactNode
}

const BranchCemeteryLayout = ({
  entity,
  navigation,
  children,
  general,
}: BranchCemeteryLayoutProps) => {
  const { title, slug, contact, medias } = entity.attributes ?? {}
  const { title: contactTitle, phone1, phone2, email } = contact?.data?.attributes ?? {}

  const hasMedias = !!medias?.data?.length

  return (
    <PageWrapper
      navigation={navigation}
      general={general}
      header={
        <HeroSection
          breadcrumbsMoreItems={[{ label: title, path: slug ?? '' }]}
          moreContent={
            hasMedias ? <ImageGallery images={medias?.data} variant="aside" /> : undefined
          }
        />
      }
    >
      <div className="h-full">
        <div
          className={cx(
            'container relative grid h-auto grid-cols-1 gap-6 pb-20 lg:grid-flow-col lg:grid-cols-[minmax(0,1fr)_auto]',
            {
              'pt-24': hasMedias,
              'pt-6': !hasMedias,
            },
          )}
        >
          {children}

          <SideBarContact title={contactTitle} phone1={phone1} phone2={phone2} email={email} />
        </div>
      </div>
    </PageWrapper>
  )
}

export default BranchCemeteryLayout
