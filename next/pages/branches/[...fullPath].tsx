import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { SSRConfig, useTranslation } from 'next-i18next'
import { ParsedUrlQuery } from 'node:querystring'

import NavigateToIcon from '../../assets/directions.svg'
import PlaceIcon from '../../assets/place.svg'
import Button from '../../components/atoms/Button'
import RichText from '../../components/atoms/RichText/RichText'
import BranchLayout from '../../components/layouts/BranchLayout'
import {
  generateStaticPaths,
  generateStaticProps,
} from '../../components/molecules/Navigation/NavigationProvider/generateStaticPathsAndProps'
import SectionBoxed from '../../components/molecules/SectionBoxed'
import Seo from '../../components/molecules/Seo'
import { BranchEntityFragment, GeneralEntityFragment, NavigationItemFragment } from '../../graphql'
import { client } from '../../utils/gql'

type BranchPageProps = {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
  entity: BranchEntityFragment
} & SSRConfig

const BranchPage = ({ navigation, entity, general }: BranchPageProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'BranchPage' })

  const { seo, title, type, address, navigateToLink, description, openingHoursOverride } =
    entity.attributes ?? {}

  return (
    <>
      <Seo seo={seo} title={title} />
      <Head>
        <title>{title}</title>
      </Head>

      <BranchLayout branch={entity} navigation={navigation} general={general}>
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
                  startIcon={<NavigateToIcon />}
                  className="-ml-2 md:ml-0"
                >
                  {t('navigate')}
                </Button>
              )}
            </div>
          </SectionBoxed>
          <SectionBoxed title={type === 'cintorin' ? t('aboutCemetery') : t('aboutBranch')}>
            <RichText content={description} coloredTable={false} />
          </SectionBoxed>
          <SectionBoxed title={t('openingHours')}>
            <RichText content={openingHoursOverride || general?.attributes?.generalOpeningHours} />
          </SectionBoxed>
        </div>
      </BranchLayout>
    </>
  )
}

interface StaticParams extends ParsedUrlQuery {
  fullPath: string[]
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  // TODO: Locales
  const paths = await generateStaticPaths('sk', (locale) =>
    client.BranchesStaticPaths({ locale }).then((response) => response.branches?.data),
  )

  // eslint-disable-next-line no-console
  console.log(`Branches: Generated static paths for ${paths.length} slugs.`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<BranchPageProps, StaticParams> = async ({
  locale = 'sk',
  params,
}) =>
  // TODO: Locales
  generateStaticProps({
    locale,
    params,
    entityPromiseGetter: ({ locale: localeInner, slug }) =>
      client
        .BranchBySlug({ locale: localeInner, slug })
        .then((response) => response.branches?.data[0]),
  })

export default BranchPage
