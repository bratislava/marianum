import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { SSRConfig } from 'next-i18next'
import { ParsedUrlQuery } from 'node:querystring'
import { SWRConfig } from 'swr'

import Divider from '../../components/atoms/Divider'
import RichText from '../../components/atoms/RichText/RichText'
import PageLayout from '../../components/layouts/PageLayout'
import SectionsWrapper from '../../components/layouts/SectionsWrapper'
import AccordionGroup from '../../components/molecules/Accordion/AccordionGroup'
import AccordionItem from '../../components/molecules/Accordion/AccordionItem'
import BranchGroup from '../../components/molecules/BranchGroup'
import DisclosureIframe from '../../components/molecules/DisclosureIframe'
import DocumentGroup from '../../components/molecules/DocumentGroup'
import {
  generateStaticPaths,
  generateStaticProps,
} from '../../components/molecules/Navigation/NavigationProvider/generateStaticPathsAndProps'
import ProcedureTabs from '../../components/molecules/ProcedureTabs'
import Section from '../../components/molecules/Section'
import Seo from '../../components/molecules/Seo'
import ArticleListing from '../../components/sections/ArticleListing/ArticleListing'
import BundleListingSection from '../../components/sections/BundleListingSection'
import CardSection from '../../components/sections/CardSection'
import CeremoniesArchiveSection from '../../components/sections/CeremoniesArchiveSection'
import CeremoniesSection from '../../components/sections/CeremoniesSection'
import ContactsSection from '../../components/sections/ContactsSection'
import DebtorsSection from '../../components/sections/DebtorsSection'
import DocumentsSection from '../../components/sections/DocumentsSection/DocumentsSection'
import ImageGallery from '../../components/sections/ImageGallery'
import MapSection from '../../components/sections/MapSection'
import MenuListingSection from '../../components/sections/MenuListingSection'
import NewsListing from '../../components/sections/NewsSection'
import PartnersSection from '../../components/sections/PartnersSection'
import ReviewListingSection from '../../components/sections/ReviewListingSection'
import RichTextSection from '../../components/sections/RichTextSection'
import {
  Enum_Page_Layout,
  GeneralEntityFragment,
  NavigationItemFragment,
  PageEntityFragment,
  ReviewEntityFragment,
  ReviewsQuery,
} from '../../graphql'
import {
  ArticleListingType,
  getArticleListingNewsPrefetches,
} from '../../utils/fetchers/articleListingFetcher'
import { getMapSectionPrefetch } from '../../utils/fetchers/cemeteriesFetcher'
import { ceremoniesArchiveSectionPrefetch } from '../../utils/fetchers/ceremoniesArchiveSectionFetcher'
import { ceremoniesSectionPrefetch } from '../../utils/fetchers/ceremoniesSectionFetcher'
import { debtorsSectionPrefetch } from '../../utils/fetchers/debtorsSectionFetcher'
import { documentsSectionPrefetch } from '../../utils/fetchers/documentsSectionFetcher'
import { getNewsListingPrefetch } from '../../utils/fetchers/newsListingFetcher'
import { partnersSectionPrefetch } from '../../utils/fetchers/partnersSectionFetcher'
import { getProceduresPrefetch } from '../../utils/fetchers/proceduresFetcher'
import { getReviewPrefetch } from '../../utils/fetchers/reviewsFetcher'
import { client } from '../../utils/gql'
import { prefetchSections } from '../../utils/prefetchSections'

type PageProps = {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
  entity: PageEntityFragment
  reviews: ReviewEntityFragment[] | null
  fallback: Record<string, object>
} & SSRConfig

const Slug = ({ navigation, entity, general, reviews, fallback }: PageProps) => {
  const { seo, title, perex, layout, sections } = entity.attributes ?? {}

  const isContainer = layout === Enum_Page_Layout.Fullwidth

  return (
    <SWRConfig value={{ fallback }}>
      <Seo seo={seo} title={title} description={perex} />
      <Head>
        <title>{title}</title>
      </Head>

      <PageLayout page={entity} navigation={navigation} general={general}>
        <SectionsWrapper
          alternateBackground={isContainer}
          startBackground="light"
          className="gap-y-6 sm:gap-y-8"
        >
          {/* eslint-disable-next-line sonarjs/cognitive-complexity */}
          {sections?.map((section) => {
            if (section?.__typename === 'ComponentSectionsProceduresSection') {
              return (
                <Section key={`${section.__typename}-${section.id}`} title={section.title}>
                  <ProcedureTabs />
                </Section>
              )
            }
            if (section?.__typename === 'ComponentSectionsRichtext') {
              return (
                <RichTextSection key={`${section.__typename}-${section.id}`} section={section} />
              )
            }
            if (section?.__typename === 'ComponentSectionsAccordionGroup') {
              return (
                <Section key={`${section.__typename}-${section.id}`}>
                  <h2 className="mb-4 grow text-center text-h3 md:mb-6 md:text-left">
                    {section.title}
                  </h2>
                  <AccordionGroup>
                    {section.accordions?.map((accordion) => (
                      <AccordionItem key={accordion?.id} title={accordion?.title}>
                        <RichText content={accordion?.content} coloredTable={false} />
                      </AccordionItem>
                    ))}
                  </AccordionGroup>
                </Section>
              )
            }
            if (section?.__typename === 'ComponentSectionsBranchGroup') {
              return (
                <Section key={`${section.__typename}-${section.id}`} title={section.title}>
                  <BranchGroup {...section} />
                </Section>
              )
            }
            if (section?.__typename === 'ComponentSectionsBundleListing') {
              return (
                <BundleListingSection
                  key={`${section.__typename}-${section.id}`}
                  section={section}
                />
              )
            }
            if (section?.__typename === 'ComponentSectionsContactGroup') {
              return <ContactsSection key={`${section.__typename}-${section.id}`} {...section} />
            }
            if (section?.__typename === 'ComponentSectionsDivider') {
              return (
                <Section key={`${section.__typename}-${section.id}`}>
                  <Divider color={section.color} />
                </Section>
              )
            }
            if (section?.__typename === 'ComponentSectionsDocumentGroup') {
              return (
                <Section key={`${section.__typename}-${section.id}`}>
                  <h2 className="mb-4 grow text-center text-h3 md:mb-6 md:text-left">
                    {section.title}
                  </h2>
                  <DocumentGroup {...section} />
                </Section>
              )
            }
            if (section?.__typename === 'ComponentSectionsPartnersSection') {
              return (
                <PartnersSection
                  key={`${section.__typename}-${section.id}`}
                  featuredTitle={section.featuredPartnersTitle}
                  otherTitle={section.otherPartnersTitle}
                />
              )
            }
            if (section?.__typename === 'ComponentSectionsGallery') {
              return (
                <Section key={`${section.__typename}-${section.id}`} title={section.title}>
                  <ImageGallery images={section.medias?.data} variant="bellow" />
                </Section>
              )
            }
            if (section?.__typename === 'ComponentSectionsMenuListing') {
              return (
                <MenuListingSection
                  key={`${section.__typename}-${section.id}`}
                  title={section.title}
                  slug={section.slug}
                  navigation={navigation}
                />
              )
            }
            if (section?.__typename === 'ComponentSectionsManualListing') {
              return <CardSection key={`${section.__typename}-${section.id}`} section={section} />
            }
            if (section?.__typename === 'ComponentSectionsNewsListing') {
              return <NewsListing key={`${section.__typename}-${section.id}`} section={section} />
            }
            if (section?.__typename === 'ComponentSectionsMapSection') {
              return <MapSection key={`${section.__typename}-${section.id}`} {...section} />
            }
            if (section?.__typename === 'ComponentSectionsPublicDisclosureSection') {
              return (
                <Section key={`${section.__typename}-${section.id}`}>
                  <DisclosureIframe />
                </Section>
              )
            }
            if (section?.__typename === 'ComponentSectionsDebtorsSection') {
              return (
                <DebtorsSection
                  key={`${section.__typename}-${section.id}`}
                  description={section.description}
                />
              )
            }
            if (section?.__typename === 'ComponentSectionsCeremoniesSection') {
              return (
                <CeremoniesSection key={`${section.__typename}-${section.id}`} section={section} />
              )
            }
            if (section?.__typename === 'ComponentSectionsCeremoniesArchiveSection') {
              return <CeremoniesArchiveSection key={`${section.__typename}-${section.id}`} />
            }
            if (section?.__typename === 'ComponentSectionsDocumentsSection') {
              return <DocumentsSection key={`${section.__typename}-${section.id}`} />
            }
            if (section?.__typename === 'ComponentSectionsArticleNewsListing') {
              return (
                <ArticleListing
                  key={`${section.__typename}-${section.id}`}
                  type={ArticleListingType.News}
                />
              )
            }
            if (section?.__typename === 'ComponentSectionsArticlePressListing') {
              return (
                <ArticleListing
                  key={`${section.__typename}-${section.id}`}
                  type={ArticleListingType.Press}
                />
              )
            }
            if (section?.__typename === 'ComponentSectionsReviewListing') {
              return (
                <ReviewListingSection
                  key={`${section.__typename}-${section.id}`}
                  reviews={reviews}
                />
              )
            }
            return null
          })}
        </SectionsWrapper>
      </PageLayout>
    </SWRConfig>
  )
}

interface StaticParams extends ParsedUrlQuery {
  fullPath: string[]
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  // TODO: Locales
  const paths = await generateStaticPaths('sk', (locale) =>
    client.PagesStaticPaths({ locale }).then((response) => response.pages?.data),
  )

  // eslint-disable-next-line no-console
  console.log(`Pages: Generated static paths for ${paths.length} slugs.`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<PageProps, StaticParams> = async ({
  locale = 'sk',
  params,
}) => {
  const sectionFetcherMap = [getReviewPrefetch(locale)]

  const sectionFetcherMapSwr = [
    getProceduresPrefetch(locale),
    getNewsListingPrefetch(locale),
    getMapSectionPrefetch(locale),
    ...getArticleListingNewsPrefetches(locale),
    ceremoniesSectionPrefetch,
    ceremoniesArchiveSectionPrefetch,
    documentsSectionPrefetch,
    debtorsSectionPrefetch,
    partnersSectionPrefetch,
  ]

  return generateStaticProps({
    // TODO: Locales
    locale,
    params,
    entityPromiseGetter: ({ slug, locale: localeInner }) =>
      client.PageBySlug({ slug, locale: localeInner }).then((response) => response.pages?.data[0]),
    getAdditionalProps: async (page) => {
      const [prefetchedSections, fallback] = await Promise.all([
        prefetchSections(page.attributes?.sections, sectionFetcherMap, false),
        // TODO fix types
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        prefetchSections(page.attributes?.sections, sectionFetcherMapSwr as any, true),
      ])

      return {
        // TODO: Fix when types improved in prefetchSections util.
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        reviews: (prefetchedSections?.reviews as ReviewsQuery)?.reviews?.data ?? null,
        fallback,
      }
    },
  })
}

export default Slug
