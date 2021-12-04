module.exports = {
    siteUrl: process.env.SITE_URL || 'https://www.cryptoneur.xyz/',
    generateRobotsTxt: true, // (optional)
    exclude: ['/server-sitemap.xml'], // <= exclude here
    robotsTxtOptions: {
      additionalSitemaps: [
        'https://www.cryptoneur.xyz/server-sitemap.xml', // <==== Add here
      ],
    },
  }