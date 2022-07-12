const { withPlausibleProxy } = require('next-plausible')

module.exports = withPlausibleProxy()({
  images: {
    domains: ['images.unsplash.com', 's3.us-west-2.amazonaws.com', 's3-us-west-2.amazonaws.com', 'pbs.twimg.com'],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  swcMinify: false,
});