import { GetStaticPaths, GetStaticProps, GetStaticPropsResult, NextPage } from 'next'
import Head from 'next/head'
import { SSRConfig, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ParsedUrlQuery } from 'node:querystring'

import CheckIcon from '../../assets/check_noPadding.svg'
import FormatCurrency from '../../components/atoms/FormatCurrency'
import RichText from '../../components/atoms/RichText/RichText'
import BundleLayout from '../../components/layouts/BundleLayout'
import AccordionGroup from '../../components/molecules/Accordion/AccordionGroup'
import AccordionItem from '../../components/molecules/Accordion/AccordionItem'
import DocumentGroup from '../../components/molecules/DocumentGroup'
import Section from '../../components/molecules/Section'
import Seo from '../../components/molecules/Seo'
import { BundleEntityFragment, GeneralEntityFragment, NavigationItemFragment } from '../../graphql'
import { client } from '../../utils/gql'
import { isDefined } from '../../utils/isDefined'

type BundlePageProps = {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
  bundle: BundleEntityFragment
} & SSRConfig

const BundlePage: NextPage<BundlePageProps> = ({ navigation, bundle, general }) => {
  const { t } = useTranslation()
  const {
    seo,
    title,
    perex,
    discountText,
    additionalServices,
    bundleItems,
    additionalItems,
    description,
    documents,
  } = bundle.attributes ?? {}

  const claims = [...(bundleItems ?? []), ...(additionalItems ?? [])].filter(isDefined)

  return (
    <>
      <Seo seo={seo} title={title} description={perex} />
      <Head>
        <title>{title}</title>
      </Head>

      <BundleLayout navigation={navigation} general={general} bundle={bundle}>
        <div className="flex flex-col">
          {/* todo: display bundle data */}
          {claims?.length ? (
            <Section>
              <h3 className="pb-6 text-h4">{t('sections.HeroSection.bundleContent')}</h3>
              <ul>
                {claims.map((item, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <li key={index} className="mt-4 flex gap-4">
                    <span className="mt-1.5 text-primary">
                      <CheckIcon className="scale-125" />
                    </span>
                    {item?.description}
                  </li>
                ))}
              </ul>

              {discountText && <div className="mt-8 font-semibold">{discountText}</div>}
            </Section>
          ) : null}

          {description ? (
            <Section>
              <RichText data={description} />
            </Section>
          ) : null}

          {additionalServices?.length ? (
            <Section>
              <h3 className="pb-4 text-h4">{t('sections.HeroSection.additionalServices')}</h3>
              <AccordionGroup>
                {additionalServices.map((service) => (
                  <AccordionItem
                    key={service?.id}
                    title={service?.title}
                    additionalInfo={
                      service?.price ? (
                        <div>
                          {t('sections.HeroSection.priceFrom')}{' '}
                          <span className="font-bold">
                            <FormatCurrency value={service.price} />
                          </span>
                        </div>
                      ) : null
                    }
                  >
                    <RichText data={service?.description} />
                  </AccordionItem>
                ))}
              </AccordionGroup>
            </Section>
          ) : null}
          {documents && (
            <Section title={documents?.title}>
              <DocumentGroup {...documents} />
            </Section>
          )}
        </div>
      </BundleLayout>
    </>
  )
}

interface StaticParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async ({ locales = ['sk'] }) => {
  const pathArraysForLocales = await Promise.all(
    locales.map((locale) => client.BundlesStaticPaths({ locale })),
  )
  const bundles = pathArraysForLocales
    .flatMap(({ bundles: allBundles }) => allBundles?.data || [])
    .filter(isDefined)

  const paths = bundles
    .map(
      (bundle) =>
        bundle?.attributes && {
          params: {
            slug: bundle?.attributes.slug,
            locale: bundle?.attributes.locale ?? '',
          },
        },
    )
    .filter(isDefined)

  // eslint-disable-next-line no-console
  console.log(`Bundles: Generated static paths for ${paths.length} slugs.`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<BundlePageProps, StaticParams> = async ({
  locale = 'sk',
  params,
}): Promise<GetStaticPropsResult<BundlePageProps>> => {
  const slug = params?.slug ?? ''

  const [{ navigation, general }, { bundles }, translations] = await Promise.all([
    client.General({ locale }),
    client.BundleBySlug({ locale, slug }),
    serverSideTranslations(locale, ['common']),
  ])

  const filteredNavigation = navigation.filter(isDefined)

  if (!bundles || bundles.data.length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      navigation: filteredNavigation,
      general: general?.data ?? null,
      bundle: bundles.data[0],
      ...translations,
    },
    revalidate: 10,
  }
}

export default BundlePage