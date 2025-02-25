import { ParsedUrlQuery } from 'node:querystring'

import { GetStaticPaths, GetStaticProps } from 'next'
import { SSRConfig, useTranslation } from 'next-i18next'

import { NavigateIcon, PlaceIcon } from '@/assets/icons'
import Button from '@/components/atoms/Button'
import RichText from '@/components/atoms/RichText'
import Seo from '@/components/atoms/Seo'
import BranchCemeteryLayout from '@/components/layouts/BranchCemeteryLayout'
import {
  generateStaticPaths,
  generateStaticProps,
} from '@/components/molecules/Navigation/NavigationProvider/generateStaticPathsAndProps'
import NavigationProvider from '@/components/molecules/Navigation/NavigationProvider/NavigationProvider'
import SectionBoxed from '@/components/molecules/SectionBoxed'
import {
  GeneralEntityFragment,
  ManagedObjectEntityFragment,
  NavigationItemFragment,
} from '@/graphql'
import { client } from '@/services/graphql/gqlClient'

type ManagedObjectPageProps = {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
  entity: ManagedObjectEntityFragment
} & SSRConfig

const ManagedObjectPage = ({ navigation, entity, general }: ManagedObjectPageProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'ManagedObjectPage' })

  const { seo, title, address, navigateToLink, description } = entity.attributes ?? {}

  return (
    <>
      {/* TODO: Extract NavigationProvider from PageWrapper */}
      <NavigationProvider navigation={navigation} general={general}>
        <Seo seo={seo} title={title} entity={entity} />
      </NavigationProvider>

      <BranchCemeteryLayout entity={entity} navigation={navigation} general={general}>
        <div className="flex flex-col gap-3 md:gap-4">
          <SectionBoxed>
            <h1 className="pb-1 md:pb-3">{title}</h1>
            <div className="flex flex-col items-start gap-2 md:flex-row">
              {address && (
                <div className="flex items-center gap-x-2">
                  <span className="text-primary">
                    <PlaceIcon />
                  </span>
                  {address}
                </div>
              )}
              {navigateToLink && (
                <Button
                  href={navigateToLink}
                  target="_blank"
                  variant="plain-secondary"
                  startIcon={<NavigateIcon />}
                  className="-ml-2 md:ml-0"
                >
                  {t('navigate')}
                </Button>
              )}
            </div>
          </SectionBoxed>
          {description && (
            <SectionBoxed title={t('aboutManagedObject')}>
              <RichText content={description} coloredTable={false} />
            </SectionBoxed>
          )}
        </div>
      </BranchCemeteryLayout>
    </>
  )
}

interface StaticParams extends ParsedUrlQuery {
  fullPath: string[]
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  // TODO: Locales
  const paths = await generateStaticPaths('sk', (locale) =>
    client.ManagedObjectsStaticPaths({ locale }).then((response) => response.managedObjects?.data),
  )

  // eslint-disable-next-line no-console,@typescript-eslint/restrict-template-expressions
  console.log(`Managed Objects: Generated static paths for ${paths.length} slugs.`)

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<ManagedObjectPageProps, StaticParams> = async ({
  locale = 'sk',
  params,
}) => {
  // eslint-disable-next-line no-console
  console.log(`Revalidating managed object ${params?.fullPath.join('/') ?? ''}`)

  return generateStaticProps({
    locale,
    params,
    entityPromiseGetter: ({ locale: localeInner, slug }) =>
      client
        .ManagedObjectBySlug({ locale: localeInner, slug })
        .then((response) => response.managedObjects?.data[0]),
  })
}

export default ManagedObjectPage
