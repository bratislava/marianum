const { i18n } = require('./next-i18next.config')
const { withSentryConfig } = require('@sentry/nextjs')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const {
  generateRedirects,
} = require('./components/molecules/Navigation/NavigationProvider/generateRedirects')

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  images: {
    domains: ['localhost', 'cdn-api.bratislava.sk'],
  },
  sentry: {
    // Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
    // for client-side builds. (This will be the default starting in
    // `@sentry/nextjs` version 8.0.0.) See
    // https://webpack.js.org/configuration/devtool/ and
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
    // for more information.
    hideSourceMaps: true,
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Graphql Proxy
        {
          source: '/graphql',
          destination: `${process.env.STRAPI_URL}/graphql`,
        },
        // Media proxy for getting media from Strapi
        {
          source: '/uploads/:file',
          destination: `${process.env.STRAPI_URL}/uploads/:file`,
        },
      ],
      afterFiles: [
        /**
         * Rewrites to make the URLs and translation of URLs work. Based on an approached outlined here:
         * https://stackoverflow.com/questions/68723485/how-to-setup-i18n-translated-url-routes-in-next-js/68731057#68731057
         */
        // TODO add english equivalents
        {
          source: '/vyhladavanie',
          destination: '/search',
        },
        ...generateRedirects([
          { fullPath: '/aktuality/novinky/:slug', nextRoute: '/articles' },
          {
            fullPath: '/o-nas/pre-media/:slug',
            nextRoute: '/articles',
          },
          {
            fullPath: '/sluzby/balicky-pohrebov/pochovanie-do-zeme/:slug',
            nextRoute: '/bundles',
          },
          {
            fullPath: '/sluzby/balicky-pohrebov/kremacia/:slug',
            nextRoute: '/bundles',
          },
          {
            fullPath: '/o-nas/kontakty/:slug',
            nextRoute: '/branches',
          },
          {
            fullPath: '/o-nas/cintoriny-v-sprave/:slug',
            nextRoute: '/branches',
          },
          {
            fullPath: '/o-nas/dokumenty/:slug',
            nextRoute: '/documents',
          },
          {
            fullPath: '/o-nas/dokumenty/legislativa/:slug',
            nextRoute: '/documents',
          },
          {
            fullPath: '/:fullPath*',
            nextRoute: '/pages',
          },
        ]),
      ],
    }
  },
  serverRuntimeConfig: {
    strapiUrl: process.env.STRAPI_URL,
  },
}

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

const config = (phase, { defaultConfig }) => {
  return {
    ...defaultConfig,
    ...nextConfig,
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      })

      // pdf worker must be available through url
      // => so we have to copy it from node_modules to public folder
      config.plugins.push(
        new CopyPlugin({
          patterns: [
            {
              from: require.resolve('pdfjs-dist/build/pdf.worker.min.js'),
              to: path.join(__dirname, 'public'),
            },
          ],
        }),
      )

      return config
    },
  }
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(config, sentryWebpackPluginOptions)
