import '../styles/globals.css'
import '../styles/table.scss'
import 'swiper/css'

// import CookieBanner from '@components/atoms/Cookies/CookieBanner'
// import CookieConsent from '@components/atoms/Cookies/CookieConsent'
// import CookieSettingsModal from '@components/atoms/Cookies/CookieSettingsModal'
import MI18nProvider from '@components/atoms/MI18nProvider'
import ThirdPartyScripts from '@components/atoms/ThirdPartyScripts'
import { GoogleTagManager } from '@next/third-parties/google'
import { HeroSectionOverlayProvider } from '@utils/heroSectionContentOverlay'
import { MotionConfig } from 'framer-motion'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next'
import { NextAdapter } from 'next-query-params'
import { OverlayProvider, SSRProvider } from 'react-aria'
import { assert, Equals } from 'tsafe'
import { QueryParamProvider } from 'use-query-params'

import enCommonNamespace from '../public/locales/en/common.json'
import skCommonNamespace from '../public/locales/sk/common.json'

// This makes sure that the translations files are in sync.
// It fails and underlined if translation files are not in same shape.
assert<Equals<typeof enCommonNamespace, typeof skCommonNamespace>>()

const MyApp = ({ Component, pageProps }: AppProps) => {
  console.log('GTM', process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID)
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#446650" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="msapplication-TileColor" content="#446650" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
        <meta name="theme-color" content="#446650" />
      </Head>
      <QueryParamProvider adapter={NextAdapter}>
        <SSRProvider>
          <HeroSectionOverlayProvider>
            <MI18nProvider>
              <MotionConfig reducedMotion="user">
                <OverlayProvider>
                  {/* Hidden until cookies are used */}
                  {/* TODO when enabling cookies: check if cookie banner is focus as first element on page */}
                  {/* <CookieConsent banner={CookieBanner} modal={CookieSettingsModal}> */}
                  <ThirdPartyScripts />
                  <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || ''} />
                  <Component {...pageProps} />
                  {/* </CookieConsent> */}
                </OverlayProvider>
              </MotionConfig>
            </MI18nProvider>
          </HeroSectionOverlayProvider>
        </SSRProvider>
      </QueryParamProvider>
    </>
  )
}

export default appWithTranslation(MyApp)
