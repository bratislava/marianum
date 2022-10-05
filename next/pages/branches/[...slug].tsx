import last from 'lodash/last'
import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from 'next'
import Head from 'next/head'
import { SSRConfig, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import NavigateToIcon from '../../assets/directions.svg'
import PlaceIcon from '../../assets/place.svg'
import Button from '../../components/atoms/Button'
import RichText from '../../components/atoms/RichText/RichText'
import BranchLayout from '../../components/layouts/BranchLayout'
import SectionBoxed from '../../components/molecules/SectionBoxed'
import Seo from '../../components/molecules/Seo'
import { BranchEntityFragment, GeneralEntityFragment, NavigationItemFragment } from '../../graphql'
import { client } from '../../utils/gql'
import { isDefined } from '../../utils/isDefined'

type PageProps = {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
  branch: BranchEntityFragment
} & SSRConfig

const BranchSlug = ({ navigation, branch, general }: PageProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'layouts.BranchLayout' })

  const { seo, title, type, address, navigateToLink, description, openingHoursOverride } =
    branch.attributes ?? {}

  return (
    <>
      <Seo seo={seo} title={title} />
      <Head>
        <title>{title}</title>
      </Head>

      <BranchLayout branch={branch} navigation={navigation} general={general}>
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

export const getStaticPaths: GetStaticPaths = async ({ locales = ['sk', 'en'] }) => {
  const pathArraysForLocales = await Promise.all(
    locales.map((locale) => client.BranchesStaticPaths({ locale })),
  )
  const branches = pathArraysForLocales
    .flatMap(({ branches: allBranches }) => allBranches?.data || [])
    .filter(isDefined)
  if (branches.length > 0) {
    const paths = branches
      .filter((branch) => branch.attributes?.slug)
      .map((branch) => ({
        params: {
          slug: branch?.attributes?.slug ? branch.attributes?.slug.split('/') : [],
          locale: branch?.attributes?.locale || '',
        },
      }))
    // eslint-disable-next-line no-console
    console.log(`Branches: Generated static paths for ${paths.length} slugs.`)
    return { paths, fallback: 'blocking' }
  }
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({
  locale = 'sk',
  params,
}): Promise<GetStaticPropsResult<PageProps>> => {
  const slug = last(params?.slug) ?? ''

  const [{ navigation, general }, { branches }, translations] = await Promise.all([
    client.General({ locale }),
    client.BranchBySlug({ locale, slug }),
    serverSideTranslations(locale, ['common']),
  ])

  const filteredNavigation = navigation.filter(isDefined)

  if (!branches || branches.data.length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      navigation: filteredNavigation,
      general: general?.data ?? null,
      branch: branches.data[0],
      ...translations,
    },
    revalidate: 10,
  }
}

export default BranchSlug
